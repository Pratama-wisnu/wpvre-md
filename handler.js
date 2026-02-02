module.exports = async (sock, chatUpdate) => {
    try {
        const msg = chatUpdate.messages[0]
        if (!msg.message) return

        const from = msg.key.remoteJid
        // Langsung ambil teks apa saja, mau dari reply atau chat biasa
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
        
        console.log('Ada chat masuk:', text) // Biar kelihatan di Termux kalau ada chat

        // BALAS SEMUA CHAT TANPA SYARAT BIAR TESNYA JELAS
        if (text.toLowerCase()) {
            await sock.sendMessage(from, { text: 'op. aku sibuk cok.' })
        }
    } catch (err) {
        console.log('Error Handler:', err)
    }
}
