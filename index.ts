import { Elysia } from 'elysia'

const app = new Elysia()

app.post('/vaidateUserOp', ({ body, set }) => {
    if 
    const signed = (body)
    
    if(signed)
        return 'Welcome back'

    set.status = 403
    return 'Invalid username or password'
})
