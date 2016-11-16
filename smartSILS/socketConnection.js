'use strict'

// the configuration file for the cq app
// IBM bluemix dedicated site
const cqURL = "ipred.mybluemix.net";

const io = require('socket.io-client/socket.io');
export const smartSocket  = io(cqURL, {transports: ['websocket'] });
