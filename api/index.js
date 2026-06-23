const corsAnywhere = require('../lib/cors-anywhere');

const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Biar bisa ditembak dari domain pildun lu
  requireHeader: [],    // Gak wajib kirim header aneh-aneh
  removeHeaders: ['cookie', 'cookie2']
});

module.exports = (req, res) => {
  // 1. Bersihkan routing bawaan Vercel jika ada
  req.url = req.url.replace(/^\/api\/index\.js/, '');
  
  // 2. FIX SAKTI: Tambah balik slash yang dimaling sama sistem Vercel/Browser
  if (req.url.startsWith('/https:/') && !req.url.startsWith('/https://')) {
    req.url = req.url.replace('/https:/', '/https://');
  } else if (req.url.startsWith('/http:/') && !req.url.startsWith('/http://')) {
    req.url = req.url.replace('/http:/', '/http://');
  }

  // Lempar request yang udah rapi ke engine cors-anywhere
  proxy.emit('request', req, res);
};
