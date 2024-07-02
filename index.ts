import { APIClient } from "@wharfkit/antelope"
import * as System from "./codegen/eosio.js"

export async function get_rexpool(client: APIClient) {
    const response = await client.v1.chain.get_table_rows({code: "eosio", scope: "eosio", table: "rexpool"})
    return System.Types.rex_pool.from(response.rows[0])
}

export async function get_rexretpool(client: APIClient) {
    const response = await client.v1.chain.get_table_rows({code: "eosio", scope: "eosio", table: "rexretpool"})
    return System.Types.rex_return_pool.from(response.rows[0])
}

export async function get_retbuckets(client: APIClient) {
    const response = await client.v1.chain.get_table_rows({code: "eosio", scope: "eosio", table: "retbuckets"})
    return System.Types.rex_return_buckets.from(response.rows[0])
}

export async function get_rex_apy(client: APIClient) {
    const rexpool = await get_rexpool(client);
    const rexretpool = await get_rexretpool(client);
    const total_lendable = rexpool.total_lendable.units.toNumber();
    const current_rate_of_increase = rexretpool.current_rate_of_increase.toNumber();
    const proceeds = rexretpool.proceeds.toNumber();
    return((proceeds + current_rate_of_increase) / 30 * 365) / total_lendable;
}
