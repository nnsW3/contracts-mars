// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export type HealthContractBaseForString = string
export type IncentivesUnchecked = string
export type Decimal = string
export type Uint128 = string
export type OracleBaseForString = string
export type ParamsBaseForString = string
export type RedBankUnchecked = string
export type SwapperBaseForString = string
export type ZapperBaseForString = string
export interface InstantiateMsg {
  health_contract: HealthContractBaseForString
  incentives: IncentivesUnchecked
  max_slippage: Decimal
  max_unlocking_positions: Uint128
  oracle: OracleBaseForString
  owner: string
  params: ParamsBaseForString
  red_bank: RedBankUnchecked
  swapper: SwapperBaseForString
  zapper: ZapperBaseForString
}
export type ExecuteMsg =
  | {
      create_credit_account: AccountKind
    }
  | {
      create_credit_account_v2: {
        account_id?: string | null
        kind: AccountKind
      }
    }
  | {
      update_credit_account: {
        account_id?: string | null
        account_kind?: AccountKind | null
        actions: Action[]
      }
    }
  | {
      repay_from_wallet: {
        account_id: string
      }
    }
  | {
      update_config: {
        updates: ConfigUpdates
      }
    }
  | {
      update_owner: OwnerUpdate
    }
  | {
      update_nft_config: {
        config?: NftConfigUpdates | null
        ownership?: Action2 | null
      }
    }
  | {
      callback: CallbackMsg
    }
export type AccountKind =
  | ('default' | 'high_levered_strategy')
  | {
      fund_manager: {
        vault_addr: string
      }
    }
export type Action =
  | {
      deposit: Coin
    }
  | {
      withdraw: ActionCoin
    }
  | {
      withdraw_to_wallet: {
        coin: ActionCoin
        recipient: string
      }
    }
  | {
      borrow: Coin
    }
  | {
      lend: ActionCoin
    }
  | {
      reclaim: ActionCoin
    }
  | {
      claim_rewards: {}
    }
  | {
      repay: {
        coin: ActionCoin
        recipient_account_id?: string | null
      }
    }
  | {
      enter_vault: {
        coin: ActionCoin
        vault: VaultBaseForString
      }
    }
  | {
      exit_vault: {
        amount: Uint128
        vault: VaultBaseForString
      }
    }
  | {
      request_vault_unlock: {
        amount: Uint128
        vault: VaultBaseForString
      }
    }
  | {
      exit_vault_unlocked: {
        id: number
        vault: VaultBaseForString
      }
    }
  | {
      liquidate: {
        debt_coin: Coin
        liquidatee_account_id: string
        request: LiquidateRequestForVaultBaseForString
      }
    }
  | {
      swap_exact_in: {
        coin_in: ActionCoin
        denom_out: string
        min_receive: Uint128
        route?: SwapperRoute | null
      }
    }
  | {
      provide_liquidity: {
        coins_in: ActionCoin[]
        lp_token_out: string
        slippage: Decimal
      }
    }
  | {
      withdraw_liquidity: {
        lp_token: ActionCoin
        slippage: Decimal
      }
    }
  | {
      stake_astro_lp: {
        lp_token: ActionCoin
      }
    }
  | {
      unstake_astro_lp: {
        lp_token: ActionCoin
      }
    }
  | {
      claim_astro_lp_rewards: {
        lp_denom: string
      }
    }
  | {
      refund_all_coin_balances: {}
    }
export type ActionAmount =
  | 'account_balance'
  | {
      exact: Uint128
    }
export type LiquidateRequestForVaultBaseForString =
  | {
      deposit: string
    }
  | {
      lend: string
    }
  | {
      vault: {
        position_type: VaultPositionType
        request_vault: VaultBaseForString
      }
    }
  | {
      staked_astro_lp: string
    }
export type VaultPositionType = 'u_n_l_o_c_k_e_d' | 'l_o_c_k_e_d' | 'u_n_l_o_c_k_i_n_g'
export type SwapperRoute =
  | {
      astro: AstroRoute
    }
  | {
      osmo: OsmoRoute
    }
export type AccountNftBaseForString = string
export type OwnerUpdate =
  | {
      propose_new_owner: {
        proposed: string
      }
    }
  | 'clear_proposed'
  | 'accept_proposed'
  | 'abolish_owner_role'
  | {
      set_emergency_owner: {
        emergency_owner: string
      }
    }
  | 'clear_emergency_owner'
export type Action2 =
  | {
      transfer_ownership: {
        expiry?: Expiration | null
        new_owner: string
      }
    }
  | 'accept_ownership'
  | 'renounce_ownership'
export type Expiration =
  | {
      at_height: number
    }
  | {
      at_time: Timestamp
    }
  | {
      never: {}
    }
export type Timestamp = Uint64
export type Uint64 = string
export type CallbackMsg =
  | {
      withdraw: {
        account_id: string
        coin: ActionCoin
        recipient: Addr
      }
    }
  | {
      borrow: {
        account_id: string
        coin: Coin
      }
    }
  | {
      repay: {
        account_id: string
        coin: ActionCoin
      }
    }
  | {
      repay_for_recipient: {
        benefactor_account_id: string
        coin: ActionCoin
        recipient_account_id: string
      }
    }
  | {
      lend: {
        account_id: string
        coin: ActionCoin
      }
    }
  | {
      reclaim: {
        account_id: string
        coin: ActionCoin
      }
    }
  | {
      claim_rewards: {
        account_id: string
      }
    }
  | {
      assert_max_ltv: {
        account_id: string
        prev_health_state: HealthState
      }
    }
  | {
      assert_deposit_caps: {
        denoms: string[]
      }
    }
  | {
      enter_vault: {
        account_id: string
        coin: ActionCoin
        vault: VaultBaseForAddr
      }
    }
  | {
      exit_vault: {
        account_id: string
        amount: Uint128
        vault: VaultBaseForAddr
      }
    }
  | {
      update_vault_coin_balance: {
        account_id: string
        previous_total_balance: Uint128
        vault: VaultBaseForAddr
      }
    }
  | {
      request_vault_unlock: {
        account_id: string
        amount: Uint128
        vault: VaultBaseForAddr
      }
    }
  | {
      exit_vault_unlocked: {
        account_id: string
        position_id: number
        vault: VaultBaseForAddr
      }
    }
  | {
      liquidate: {
        debt_coin: Coin
        liquidatee_account_id: string
        liquidator_account_id: string
        request: LiquidateRequestForVaultBaseForAddr
      }
    }
  | {
      swap_exact_in: {
        account_id: string
        coin_in: ActionCoin
        denom_out: string
        min_receive: Uint128
        route?: SwapperRoute | null
      }
    }
  | {
      update_coin_balance: {
        account_id: string
        change: ChangeExpected
        previous_balance: Coin
      }
    }
  | {
      update_coin_balance_after_vault_liquidation: {
        account_id: string
        previous_balance: Coin
        protocol_fee: Decimal
      }
    }
  | {
      provide_liquidity: {
        account_id: string
        coins_in: ActionCoin[]
        lp_token_out: string
        slippage: Decimal
      }
    }
  | {
      stake_astro_lp: {
        account_id: string
        lp_token: ActionCoin
      }
    }
  | {
      unstake_astro_lp: {
        account_id: string
        lp_token: ActionCoin
      }
    }
  | {
      claim_astro_lp_rewards: {
        account_id: string
        lp_denom: string
      }
    }
  | {
      withdraw_liquidity: {
        account_id: string
        lp_token: ActionCoin
        slippage: Decimal
      }
    }
  | {
      refund_all_coin_balances: {
        account_id: string
      }
    }
  | {
      assert_hls_rules: {
        account_id: string
      }
    }
  | {
      remove_reentrancy_guard: {}
    }
export type Addr = string
export type HealthState =
  | 'healthy'
  | {
      unhealthy: {
        max_ltv_health_factor: Decimal
      }
    }
export type LiquidateRequestForVaultBaseForAddr =
  | {
      deposit: string
    }
  | {
      lend: string
    }
  | {
      vault: {
        position_type: VaultPositionType
        request_vault: VaultBaseForAddr
      }
    }
  | {
      staked_astro_lp: string
    }
export type ChangeExpected = 'increase' | 'decrease'
export interface Coin {
  amount: Uint128
  denom: string
  [k: string]: unknown
}
export interface ActionCoin {
  amount: ActionAmount
  denom: string
}
export interface VaultBaseForString {
  address: string
}
export interface AstroRoute {
  swaps: AstroSwap[]
}
export interface AstroSwap {
  from: string
  to: string
}
export interface OsmoRoute {
  swaps: OsmoSwap[]
}
export interface OsmoSwap {
  pool_id: number
  to: string
}
export interface ConfigUpdates {
  account_nft?: AccountNftBaseForString | null
  health_contract?: HealthContractBaseForString | null
  incentives?: IncentivesUnchecked | null
  max_slippage?: Decimal | null
  max_unlocking_positions?: Uint128 | null
  oracle?: OracleBaseForString | null
  red_bank?: RedBankUnchecked | null
  rewards_collector?: string | null
  swapper?: SwapperBaseForString | null
  zapper?: ZapperBaseForString | null
}
export interface NftConfigUpdates {
  credit_manager_contract_addr?: string | null
  health_contract_addr?: string | null
  max_value_for_burn?: Uint128 | null
}
export interface VaultBaseForAddr {
  address: Addr
}
export type QueryMsg =
  | {
      account_kind: {
        account_id: string
      }
    }
  | {
      accounts: {
        limit?: number | null
        owner: string
        start_after?: string | null
      }
    }
  | {
      config: {}
    }
  | {
      vault_utilization: {
        vault: VaultBaseForString
      }
    }
  | {
      all_vault_utilizations: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      positions: {
        account_id: string
      }
    }
  | {
      all_coin_balances: {
        limit?: number | null
        start_after?: [string, string] | null
      }
    }
  | {
      all_debt_shares: {
        limit?: number | null
        start_after?: [string, string] | null
      }
    }
  | {
      total_debt_shares: string
    }
  | {
      all_total_debt_shares: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      all_vault_positions: {
        limit?: number | null
        start_after?: [string, string] | null
      }
    }
  | {
      estimate_provide_liquidity: {
        coins_in: Coin[]
        lp_token_out: string
      }
    }
  | {
      estimate_withdraw_liquidity: {
        lp_token: Coin
      }
    }
  | {
      vault_position_value: {
        vault_position: VaultPosition
      }
    }
  | {
      vault_bindings: {
        limit?: number | null
        start_after?: string | null
      }
    }
export type VaultPositionAmount =
  | {
      unlocked: VaultAmount
    }
  | {
      locking: LockingVaultAmount
    }
export type VaultAmount = string
export type VaultAmount1 = string
export type UnlockingPositions = VaultUnlockingPosition[]
export interface VaultPosition {
  amount: VaultPositionAmount
  vault: VaultBaseForAddr
}
export interface LockingVaultAmount {
  locked: VaultAmount1
  unlocking: UnlockingPositions
}
export interface VaultUnlockingPosition {
  coin: Coin
  id: number
}
export type ArrayOfAccount = Account[]
export interface Account {
  id: string
  kind: AccountKind
}
export type ArrayOfCoinBalanceResponseItem = CoinBalanceResponseItem[]
export interface CoinBalanceResponseItem {
  account_id: string
  amount: Uint128
  denom: string
}
export type ArrayOfSharesResponseItem = SharesResponseItem[]
export interface SharesResponseItem {
  account_id: string
  denom: string
  shares: Uint128
}
export type ArrayOfDebtShares = DebtShares[]
export interface DebtShares {
  denom: string
  shares: Uint128
}
export type ArrayOfVaultPositionResponseItem = VaultPositionResponseItem[]
export interface VaultPositionResponseItem {
  account_id: string
  position: VaultPosition
}
export interface PaginationResponseForVaultUtilizationResponse {
  data: VaultUtilizationResponse[]
  metadata: Metadata
}
export interface VaultUtilizationResponse {
  utilization: Coin
  vault: VaultBaseForString
}
export interface Metadata {
  has_more: boolean
}
export interface ConfigResponse {
  account_nft?: string | null
  health_contract: string
  incentives: string
  max_slippage: Decimal
  max_unlocking_positions: Uint128
  oracle: string
  ownership: OwnerResponse
  params: string
  red_bank: string
  rewards_collector?: RewardsCollector | null
  swapper: string
  zapper: string
}
export interface OwnerResponse {
  abolished: boolean
  emergency_owner?: string | null
  initialized: boolean
  owner?: string | null
  proposed?: string | null
}
export interface RewardsCollector {
  account_id: string
  address: string
}
export type ArrayOfCoin = Coin[]
export interface Positions {
  account_id: string
  account_kind: AccountKind
  debts: DebtAmount[]
  deposits: Coin[]
  lends: Coin[]
  staked_astro_lps: Coin[]
  vaults: VaultPosition[]
}
export interface DebtAmount {
  amount: Uint128
  denom: string
  shares: Uint128
}
export type ArrayOfVaultBinding = VaultBinding[]
export interface VaultBinding {
  account_id: string
  vault_address: string
}
export interface VaultPositionValue {
  base_coin: CoinValue
  vault_coin: CoinValue
}
export interface CoinValue {
  amount: Uint128
  denom: string
  value: Uint128
}
