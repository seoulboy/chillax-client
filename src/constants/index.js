const localClientDomain = `http://localhost:3000`;
const cloudClientDomain = 'https://api.imho.space';

const localServerDomain = `http://localhost:4000`;
const cloudServerDomain = 'https://api.imho.space';

const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? localServerDomain
    : cloudServerDomain;

const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? localClientDomain
    : cloudClientDomain;

module.exports = { CLIENT_URL, SERVER_URL };
