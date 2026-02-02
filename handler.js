module.exports = async (sock, chatUpdate) => {
    try {
        const msg = chatUpdate.messages[0]
        if (!msg.message || msg.key.fromMe) return

        const from = msg.key.remoteJid
        const type = Object.keys(msg.message)[0]
        const text = (type === 'conversation') ? msg.message.conversation : 
                     (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''

        // --- LOGIKA BAHASA GAUL JAWA (HUMAN-LIKE) ---

        if (text === 'p' || text === 'nu') {
            const jawapan = ['op.', 'enek op?.', 'py?', 'ha?']
            const random = jawapan[Math.floor(Math.random() * jawapan.length)]
            await sock.sendMessage(from, { text: random }, { quoted: msg })
        } 
        else if (text.includes('halo') || text.includes('hey')) {
            await sock.sendMessage(from, { text: 'iy enek op? aku sibuk cok.' }, { quoted: msg })
        } 
        else if (text === 'menu') {
            await sock.sendMessage(from, { text: 'gah, raenek menu-menuan. langsung wae.' }, { quoted: msg })
        }

    } catch (err) {
        console.log('Error Handler:', err)
    }
}
