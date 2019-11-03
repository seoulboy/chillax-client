const localClientDomain = `http://localhost:3000`;
const cloudClientDomain = '';

const localServerDomain = `http://localhost:4000`;
const cloudServerDomain = '';

const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? localServerDomain
    : cloudServerDomain;

const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? localClientDomain
    : cloudClientDomain;

module.exports = { CLIENT_URL, SERVER_URL };
