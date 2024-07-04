import "dotenv/config"

import { createBot, createProvider, createFlow } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider} from '@builderbot/provider-baileys'


const PORT = process.env?.PORT ?? 3010

const main = async () => {

    const provider = createProvider(BaileysProvider)

    const adapterFlow = createFlow([])    
    const adapterDB = new Database()

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider,
        database: adapterDB,
    })
    
    httpServer(+PORT)

    provider.server.post('/send-messages', handleCtx(async (bot, req, res) => {
        const { phone, message } = req.body
        await bot.sendMessage(phone, message, {})
        return res.end('send')
    }))

    
}

main()
