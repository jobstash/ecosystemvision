// Verification-only preload. Do not install this in the application runtime.
const net = require('node:net');
const allowed = new Set(['127.0.0.1', '::1', 'localhost']);
// Next's real font download is the only permitted public build dependency.
if (process.env.FIXTURE_ALLOW_FONTS === '1') {
  allowed.add('fonts.googleapis.com');
  allowed.add('fonts.gstatic.com');
}
const connect = net.Socket.prototype.connect;
net.Socket.prototype.connect = function (...args) {
  const [options] = Array.isArray(args[0]) ? args[0] : net._normalizeArgs(args);
  const host = options.host || 'localhost';
  if (options.path || !allowed.has(host)) {
    const error = new Error('Fixture verification blocked nonlocal network connection');
    error.code = 'ERR_FIXTURE_NETWORK';
    throw error;
  }
  return connect.apply(this, args);
};
