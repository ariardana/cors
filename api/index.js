const corsAnywhere = require('../lib/cors-anywhere');

const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Biar bisa ditembak dari domain pildun lu
  requireHeader: [],    // Gak wajib kirim header aneh-aneh dari browser
  removeHeaders: ['cookie', 'cookie2']
});

module.exports = (req, res) => {
  // 1. Bersihkan routing bawaan Vercel jika ada
  req.url = req.url.replace(/^\/api\/index\.js/, '');
  
  // 2. FIX SAKTI: Tambah balik slash yang dimaling sistem Vercel
  if (req.url.startsWith('/https:/') && !req.url.startsWith('/https://')) {
    req.url = req.url.replace('/https:/', '/https://');
  } else if (req.url.startsWith('/http:/') && !req.url.startsWith('/http://')) {
    req.url = req.url.replace('/http:/', '/http://');
  }

  // 3. SUNTIK HEADER RTBGO SECARA OTOMATIS (Biar .m3u8 dan .ts tembus tanpa syarat)
  req.headers['referer'] = 'https://www.rtbgo.bn/';
  req.headers['user-agent'] = 'RTBGo/2.0.21 (Linux;Android 15.0.0;) ExoPlayerLib/2.19.1';
  req.headers['x-dtv-key'] = '21X83_SECURE_PLAY';
  req.headers['x-core'] = 'shield_hls';

  // Lempar request ke engine cors-anywhere
  proxy.emit('request', req, res);
};
