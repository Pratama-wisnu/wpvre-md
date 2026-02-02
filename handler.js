module.exports = async (sock, chatUpdate) => {
    try {
        const msg = chatUpdate.messages[0]
        // KUNCI UTAMA: Jangan balas kalau pesan berasal dari nomor bot itu sendiri
        if (!msg.message || msg.key.fromMe) return

        const from = msg.key.remoteJid
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
        
        const command = text.toLowerCase()

        if (command === 'p' || command === 'nu') {
            await sock.sendMessage(from, { text: 'op.' })
        } 
        else if (command.includes('halo')) {
            await sock.sendMessage(from, { text: 'aku sibuk cok.' })
        }
    } catch (err) {
        console.log('Error:', err)
    }
}
