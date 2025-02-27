use std::collections::HashMap;

use cosmwasm_std::{Addr, Coin, Coins, Decimal, StdResult, Uint128};
use mars_credit_manager::error::ContractError;
use mars_testing::multitest::helpers::{coin_info, ASTRO_LP_DENOM};
use mars_types::{
    credit_manager::{Action, ActionAmount, ActionCoin},
    params::{AssetParams, AssetParamsUpdate},
    swapper::{OsmoRoute, OsmoSwap, SwapperRoute},
};
use test_case::test_case;

use super::helpers::{AccountToFund, MockEnv};

#[test_case(
    [].into(),
    vec![
        Action::Deposit(Coin {
            denom: "uatom".into(),
            amount: Uint128::new(123),
        }),
        Action::Deposit(Coin {
            denom: "uosmo".into(),
            amount: Uint128::new(456),
        }),
    ],
    true;
    "no deposit cap"
)]
#[test_case(
    [("uatom", 100)].into(),
    vec![
        Action::Deposit(Coin {
            denom: "uatom".into(),
            amount: Uint128::new(101), // this exceeds the cap of 100
        }),
        Action::Deposit(Coin {
            denom: "uosmo".into(),
            amount: Uint128::new(456),
        }),
    ],
    false;
    "deposit cap exceeded"
)]
#[test_case(
    [("uatom", 100)].into(),
    vec![
        // this first action exceeds deposit cap...
        Action::Deposit(Coin {
            denom: "uatom".into(),
            amount: Uint128::new(101),
        }),
        // but we immediately does a swap to uatom, which does not exceed cap
        // therefore, the tx should be successful
        Action::SwapExactIn {
            coin_in: ActionCoin {
                denom: "uatom".into(),
                amount: ActionAmount::AccountBalance,
            },
            denom_out: "uosmo".into(),
            min_receive: Uint128::zero(),
            route: Some(SwapperRoute::Osmo(OsmoRoute{swaps: vec![
                OsmoSwap {
                    pool_id: 101,
                    to: "uosmo".into(),
                }
            ]}))
        }
    ],
    true;
    "a deposit action causes cap to be exceeded but a follow up swap action saves it"
)]
#[test_case(
    // in our specific test setup, 123 uatom swaps to 1337 uosmo
    // we set the cap to 1000 uosmo which should be exceeded
    [("uatom", 200), ("uosmo", 1000)].into(),
    vec![
        Action::Deposit(Coin {
            denom: "uatom".into(),
            amount: Uint128::new(123),
        }),
        Action::SwapExactIn {
            coin_in: ActionCoin {
                denom: "uatom".into(),
                amount: ActionAmount::AccountBalance,
            },
            denom_out: "uosmo".into(),
            min_receive: Uint128::zero(),
            route: Some(SwapperRoute::Osmo(OsmoRoute{swaps: vec![
                OsmoSwap {
                    pool_id: 101,
                    to: "uosmo".into(),
                }
            ]}))
        }
    ],
    false;
    "a deposit action is below cap but a follow up swap action exceeds the cap"
)]
#[test_case(
    [("uosmo", 1000), ("ujake", 1000), (ASTRO_LP_DENOM, 1000)].into(),
    vec![
        Action::Deposit(Coin {
            denom: "uosmo".into(),
            amount: Uint128::new(101),
        }),
        Action::Deposit(Coin {
            denom: "ujake".into(),
            amount: Uint128::new(456),
        }),
        Action::ProvideLiquidity { coins_in: vec![
        ActionCoin {
            denom: "uosmo".into(),
            amount: ActionAmount::AccountBalance,
        },
        ActionCoin {
            denom: "ujake".into(),
            amount: ActionAmount::AccountBalance,
        }],
        lp_token_out: ASTRO_LP_DENOM.to_string(), slippage: Decimal::percent(5) }
    ],
    false;
    "LP deposit cap exceeded"
)]
fn asserting_deposit_cap(
    deposit_caps: HashMap<&'static str, u128>,
    actions: Vec<Action>,
    exp_ok: bool,
) {
    let user = Addr::unchecked("user");

    // compute how much coins need to be sent to the contract in order to update
    // the credit account
    let send_funds = actions
        .iter()
        .try_fold(Coins::default(), |mut coins, action| -> StdResult<_> {
            if let Action::Deposit(coin) = action {
                coins.add(coin.clone())?;
            }
            Ok(coins)
        })
        .unwrap()
        .to_vec();

    let mut params = vec![];
    for denom in deposit_caps.keys() {
        params.push(coin_info(denom));
    }

    // set up mock environment
    let mut mock = MockEnv::new()
        .set_params(&params)
        .fund_account(AccountToFund {
            addr: user.clone(),
            funds: send_funds.clone(),
        })
        .build()
        .unwrap();

    // set deposit caps for uosmo and uatom
    // the `uosmo_info` and `uatom_info` functions set the cap to Uint128::MAX,
    // so here we need to update them to our intended value for the purpose of
    // this test
    for (denom, cap) in deposit_caps {
        let mut params: AssetParams = mock.query_asset_params(denom);
        params.deposit_cap = cap.into();
        mock.update_asset_params(AssetParamsUpdate::AddOrUpdate {
            params: params.into(),
        });
    }

    // register an account
    let account_id = mock.create_credit_account(&user).unwrap();

    // attempt to execute the actions
    let result = mock.update_credit_account(&account_id, &user, actions, &send_funds);

    if exp_ok {
        assert!(result.is_ok());
    } else {
        let err: ContractError = result.unwrap_err().downcast().unwrap();
        // if errors, we make sure the error is the AboveAssetDepositCap error
        // and not any other error
        assert!(matches!(err, ContractError::AboveAssetDepositCap { .. }));
    }
}
