import { Elysia } from 'elysia';
import { z } from 'zod';

const UserOperationSchema = z.object({
    sender: z.string().regex(/^0x[a-fA-F0-9]{40}$/),  // Assuming an address is a string. Adjust if necessary.
    nonce: z.number(),
    initCode: z.string(),  // Assuming bytes are represented as strings. Adjust if necessary.
    callData: z.string(),  // Same assumption as above.
    callGasLimit: z.number(),
    verificationGasLimit: z.number(),
    preVerificationGas: z.number(),
    maxFeePerGas: z.number(),
    maxPriorityFeePerGas: z.number(),
    paymasterAndData: z.string(),  // Same assumption as above.
    signature: z.string()  // Same assumption as above.
  });

const app = new Elysia()

app.group('/kratos', app => app
    .post('/sendUserOperation', signIn)
)


app.post('/sendUserOperation', ({ body, set }) => {
    const validateUserOperation = UserOperationSchema.safeParse(body)
    if(!validateUserOperation.success){
        set.status= 400
        return console.log(validateUserOperation.error)
    }
    else{
        const userOperation = validateUserOperation.data
    }
}).listen(8080)
