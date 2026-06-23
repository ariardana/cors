const corsAnywhere = require('../lib/cors-anywhere');

// Konfigurasi instance proxy cors-anywhere
const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Biarkan kosong agar bisa diakses dari domain player lu
  requireHeader: [],    // Dikosongkan agar player video m3u8/ts gak wajib kirim header aneh-aneh
  removeHeaders: ['cookie', 'cookie2']
});

// Export sebagai handler Serverless Function Vercel
module.exports = (req, res) => {
  // Alirkan request Vercel langsung ke dalam system cors-anywhere
  proxy.emit('request', req, res);
};
