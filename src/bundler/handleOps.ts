import {
  getContract,
  http,
  Address,
  Hash,
  TransactionReceipt,
  createPublicClient,
  createWalletClient,
  custom,
  stringify,
  Hex
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts' 

import { entrypointAbi } from '../bundler/abi'
import { goerli } from 'viem/chains'

const publicClient = createPublicClient({
  chain: goerli,
  transport: http(),
})

const entrypointContract = getContract({
  address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
  abi: entrypointAbi,
  publicClient,
})

console.log(entrypointContract)



console.log("Hey test 1")
if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY environment variable not set")
const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex) 

console.log(account)

// Entrypoint contract ABi


console.log("Hey I'm here")

// Create a signer


const walletClient = createWalletClient({
  chain: goerli,
  transport: http(),
})

// 1. Create contract instance


/*
1. Entrypoint contract( getContract())
2. Able to write the the entrypoint contract
3. UserOp object for the handleOps function with all other parameters
4. Send the transaction
*/