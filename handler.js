module.exports = async (sock, m, chatUpdate) => {
    try {
        const msg = m.messages[0]
        if (!msg.message || msg.key.fromMe) return
        
        const from = msg.key.remoteJid
        const text = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').toLowerCase()
        
        if (global.status) {
            await sock.sendPresenceUpdate('composing', from)
        }

        // --- LOGIKA BAHASA GAUL JAWA (HUMAN-LIKE) ---
        
        if (text === 'p' || text === 'nu') {
            // Balasan singkat & padat
            const jawapan = ['op.', 'enek op.', 'py?', 'ha?']
            const random = jawapan[Math.floor(Math.random() * jawapan.length)]
            await sock.sendMessage(from, { text: random })
        } 
        else if (text.includes('halo') || text.includes('hey')) {
            // Balasan kasar-mesra khas tongkrongan
            await sock.sendMessage(from, { text: 'iy enek op? aku sibuk cok.' })
        } 
        else if (text === 'menu') {
            await sock.sendMessage(from, { text: 'gah, raenek menu-menuan. langsung chat wae.' })
        }

    } catch (err) {
        console.log('Error Handler:', err)
    }
}