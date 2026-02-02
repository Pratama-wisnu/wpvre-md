module.exports = async (sock, chatUpdate) => {
    try {
        const msg = chatUpdate.messages[0]
        if (!msg.message || msg.key.fromMe) return

        const from = msg.key.remoteJid
        const type = Object.keys(msg.message)[0]
        
        // Mengambil teks dari berbagai jenis pesan
        let text = ''
        if (type === 'conversation') {
            text = msg.message.conversation
        } else if (type === 'extendedTextMessage') {
            text = msg.message.extendedTextMessage.text
        }

        const command = text.toLowerCase()

        // LOGIKA BALASAN CHAT
        if (command === 'p' || command === 'nu') {
            const jawapan = ['op.', 'enek op.', 'py?', 'ha?']
            const random = jawapan[Math.floor(Math.random() * jawapan.length)]
            await sock.sendMessage(from, { text: random })
        } 
        else if (command.includes('halo') || command.includes('hey')) {
            await sock.sendMessage(from, { text: 'iy enek op? aku sibuk cok.' })
        } 
        else if (command === 'menu') {
            await sock.sendMessage(from, { text: 'gah, raenek menu-menuan. langsung wae.' })
        }

    } catch (err) {
        console.log('Error di Handler:', err)
    }
}
