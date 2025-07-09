const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const CryptoJS = require('crypto-js');

const app = express();
app.use(cors());
app.use(express.json());

const Credential = require('./models/Credential');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// GET all credentials and decrypt passwords
app.get('/api/credentials', async (req, res) => {
  try {
    console.log('📥 GET /api/credentials - Fetching all credentials');
    const credentials = await Credential.find().sort({ createdAt: -1 });
    
    console.log(`📊 Found ${credentials.length} credentials in database`);

    const decryptedCreds = credentials.map((cred) => {
      const decryptedPassword = CryptoJS.AES.decrypt(
        cred.password,
        process.env.ENCRYPTION_SECRET
      ).toString(CryptoJS.enc.Utf8);

      return {
        ...cred._doc,
        password: decryptedPassword,
      };
    });

    console.log('✅ Credentials decrypted and sent to frontend');
    res.json(decryptedCreds);
  } catch (err) {
    console.error('❌ Error fetching credentials:', err);
    res.status(500).json({ error: 'Failed to fetch credentials' });
  }
});

// POST a new credential with encrypted password
app.post('/api/credentials', async (req, res) => {
  try {
    console.log('📥 POST /api/credentials - Received data from frontend:');
    console.log('Raw request body:', req.body);
    
    const { app, username, password } = req.body;
    
    console.log('📋 Parsed credentials:');
    console.log('  App/Website:', app);
    console.log('  Username:', username);
    console.log('  Password:', password ? `${password.substring(0, 3)}${'*'.repeat(password.length - 3)}` : 'undefined');
    console.log('  Password length:', password ? password.length : 0);

    // Validation
    if (!app || !username || !password) {
      console.log('❌ Validation failed - Missing required fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('🔐 Encrypting password...');
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.ENCRYPTION_SECRET
    ).toString();
    
    console.log('🔐 Password encrypted successfully');

    const newCred = new Credential({
      app,
      username,
      password: encryptedPassword,
    });

    console.log('💾 Saving credential to database...');
    await newCred.save();
    
    console.log('✅ Credential saved successfully with ID:', newCred._id);
    res.status(200).json({ message: 'Encrypted credential saved', id: newCred._id });
  } catch (err) {
    console.error('❌ Error saving credential:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/credentials/:id', async (req, res) => {
  try {
    await Credential.findByIdAndDelete(req.params.id);
    res.json({ message: 'Credential deleted successfully' });
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ error: 'Failed to delete credential' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});