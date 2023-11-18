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
  Hex,
  concatHex,
  encodeFunctionData
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts' 

import { entrypointAbi } from '../bundler/abi'
import { goerli } from 'viem/chains'
import { SimpleAccountFactoryAbi } from './simpleAccountFactory'

const publicClient = createPublicClient({
  chain: goerli,
  transport: http(),
})

const entrypointContract = getContract({
  address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
  abi: entrypointAbi,
  publicClient,
})

if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY environment variable not set")
const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex) 

const walletClient = createWalletClient({
  account: account,
  chain: goerli,
  transport: http(),
})

const initCode = concatHex(
  [
    '0x9406Cc6185a346906296840746125a0E44976454',
     encodeFunctionData({abi: SimpleAccountFactoryAbi, functionName: 'createAccount', args:[walletClient.account.address, 0n]})
  ])

try {
  const { result } = await publicClient.simulateContract({
    address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    abi: entrypointAbi,
    functionName: 'getSenderAddress',
    args: [initCode],
    account,
  })
    // some code that may throw an error
  } catch (err) {
    if (err instanceof Error) {
      const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
      if (revertError instanceof ContractFunctionRevertedError) {
        const errorName = revertError.data?.errorName ?? ''
        // do something with `errorName`
      }
    }
  }

const { result } = await publicClient.simulateContract({
    address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    abi: entrypointAbi,
    functionName: 'getSenderAddress',
    args: [initCode],
    account,
  })

  

// Entrypoint contract ABi


console.log("Hey I'm here")

// Create a signer




// 1. Create contract instance


/*
1. Entrypoint contract( getContract())
2. Able to write the the entrypoint contract
3. Simulate contract which is an entrypoint contract
3. UserOp object for the handleOps function with all other parameters
{
  sender: ,
  nonce:,
  initCode:,
  callData:,
  paymasterAndData:,
  maxFeePerGas:,
  maxPriorityFeePerGas:,
  callGasLimit:,
  verificationGasLimit:,
  preVerificationGas:,
  signature:,
}



4. Send the transaction
*/