import { APIClient } from "@wharfkit/antelope"
import { Chains } from "@wharfkit/common";
import { get_rex_apy } from ".";

const client = new APIClient({url: Chains.EOS.url})

get_rex_apy(client).then(console.log).catch(console.error)