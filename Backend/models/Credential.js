const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
  app: String,
  username: String,
  password: String,
}, { timestamps: true });

module.exports = mongoose.model('Credential', credentialSchema);
