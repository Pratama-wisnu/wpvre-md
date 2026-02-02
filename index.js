const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')
const pino = require('pino')
require('./config')

async function startWPVre() {
    const { state, saveCreds } = await useMultiFileAuthState('session_wpvre')
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        getMessage: async (key) => { return { conversation: 'WP Vre-MD' } }
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            if (shouldReconnect) startWPVre()
        } else if (connection === 'open') {
            console.log('✅ WP Vre-MD Berhasil Tersambung!')
        }
    })

    sock.ev.on('messages.upsert', async chatUpdate => {
        require('./handler')(sock, chatUpdate)
    })
}

startWPVre()
