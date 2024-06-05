// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.35.3.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export interface InstantiateMsg {
  owner: string
  prefix: string
}
export type ExecuteMsg =
  | {
      set_address: {
        address: string
        address_type: MarsAddressType
      }
    }
  | {
      update_owner: OwnerUpdate
    }
export type MarsAddressType =
  | ('incentives' | 'oracle' | 'red_bank' | 'rewards_collector' | 'params' | 'credit_manager')
  | 'protocol_admin'
  | 'fee_collector'
  | 'safety_fund'
  | 'swapper'
  | 'astroport_incentives'
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
export type QueryMsg =
  | {
      config: {}
    }
  | {
      address: MarsAddressType
    }
  | {
      addresses: MarsAddressType[]
    }
  | {
      all_addresses: {
        limit?: number | null
        start_after?: MarsAddressType | null
      }
    }
export interface AddressResponseItem {
  address: string
  address_type: MarsAddressType
}
export type ArrayOfAddressResponseItem = AddressResponseItem[]
export interface ConfigResponse {
  owner?: string | null
  prefix: string
  proposed_new_owner?: string | null
}
