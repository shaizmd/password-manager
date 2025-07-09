import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Manager() {
  const [form, setForm] = useState({ app: '', username: '', password: '' });
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const fetchCredentials = async () => {
    try {
      setError(null);
      const res = await axios.get('http://localhost:5000/api/credentials');
      setCredentials(res.data.map(cred => ({ ...cred, showPassword: false })));

    } catch (error) {
      console.error('Error fetching credentials:', error);
      if (error.code === 'ERR_NETWORK' || error.message.includes('ERR_CONNECTION_REFUSED')) {
        setError('Cannot connect to server. Please make sure the backend server is running on port 5000.');
      } else {
        setError('Failed to load credentials. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

const togglePassword = (index) => {
  setCredentials(prev => 
    prev.map((cred, i) => 
      i === index ? { ...cred, showPassword: !cred.showPassword } : cred
    )
  );
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.app || !form.username || !form.password) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/credentials', form);
      setForm({ app: '', username: '', password: '' });
      fetchCredentials();
    } catch (error) {
      console.error('Error adding credential:', error);
      alert('Failed to add credential');
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
  const confirm = window.confirm('Are you sure you want to delete this credential?');
  if (!confirm) return;

  try {
    await axios.delete(`http://localhost:5000/api/credentials/${id}`);
    fetchCredentials(); // Refresh the list
  } catch (error) {
    console.error('Error deleting credential:', error);
    alert('Failed to delete credential.');
  }
};


  return (
    <div className="h-full bg-gradient-to-r from-lime-300 to-cyan-300 flex-grow p-6 flex flex-col md:flex-row gap-6 min-h-0">
      
      {/* Left: Add Credential Form */}
      <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Credential</h2>
        <div className="flex flex-col space-y-4">
          <input 
            name="app"
            type="text" 
            placeholder="Website or URL" 
            value={form.app}
            onChange={handleChange}
            className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-600" 
          />
          <input 
            name="username"
            type="text" 
            placeholder="Username or Email" 
            value={form.username}
            onChange={handleChange}
            className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-600" 
          />
          <div className="relative">
          <input 
            name="password"
            type={showPassword? 'text': 'password'} 
            placeholder="Password" 
            value={form.password}
            onChange={handleChange}
            className="w-full pr-10 px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-600" 
          />
          <button
    type="button"
    onClick={() => setShowPassword(prev => !prev)}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-cyan-500"
    title={showPassword ? 'Hide password' : 'Show password'}
  >
    {showPassword ? (
      // 👁️ Eye-off icon
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
     viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.054.162-2.065.46-3.005m4.562 4.56A2.5 2.5 0 1012 14.5a2.5 2.5 0 00-2.978-2.978M3 3l18 18"
    />
</svg>

    ) : (
     
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    )}
  </button>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 px-4 py-2 bg-cyan-500/80 hover:bg-cyan-600/90 text-white rounded-md font-medium transition-all duration-200 backdrop-blur-sm border border-cyan-400/30 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Adding...' : ' + Add Credential'}
          </button>
        </div>
      </div>

      {/* Right: Credential Preview Panel with Confined Scroll */}
      <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-xl p-6 flex flex-col min-h-0">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex-shrink-0">Saved Credentials</h2>
        <div className="flex-1 overflow-y-auto space-y-4 min-h-0 pr-2 scrollbar-thin scrollbar-thumb-cyan-400/70 scrollbar-track-white/20 hover:scrollbar-thumb-cyan-500/80 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          {error ? (
            <div className="text-center text-red-600 py-8">
              <button 
                onClick={fetchCredentials}
                className="mt-4 px-4 py-2 bg-red-500/80 hover:bg-red-600/90 text-white rounded-md font-medium transition-all duration-200 backdrop-blur-sm border border-red-400/30 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Retry Connection
              </button>
            </div>
          ) : credentials.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              <p>No credentials saved yet.</p>
              <p className="text-sm mt-2">Add your first credential</p>
            </div>
          ) : (
           credentials.map((cred, i) => (
  <div key={cred._id || i} className="p-4 bg-white/40 backdrop-blur-sm rounded-lg border border-white/40 shadow flex justify-between items-center flex-shrink-0">
    <div>
      <p className="text-gray-800 font-medium">🔒 {cred.app}</p>
      <p className="text-sm text-gray-700">{cred.username}</p>
<div className="relative">
  <input
    type={cred.showPassword ? 'text' : 'password'}
    value={cred.password}
    readOnly
    className="w-full text-sm text-gray-700 bg-transparent border-none focus:outline-none"
  />
  <button
    onClick={() => togglePassword(i)}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-cyan-600 transition"
    title={cred.showPassword ? 'Hide password' : 'Show password'}
  >
    {cred.showPassword ? (
      // 👁️ Eye-off icon
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.054.162-2.065.46-3.005m4.562 4.56A2.5 2.5 0 1012 14.5a2.5 2.5 0 00-2.978-2.978M3 3l18 18"
        />
      </svg>
    ) : (
      // 👁️ Eye icon
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    )}
  </button>
</div>

    </div>

    {/* 🔥 Delete button */}
    <button
      onClick={() => handleDelete(cred._id)}
      className="ml-4 p-2 bg-red-400/20 hover:bg-red-500/30 rounded-full transition backdrop-blur-sm border border-red-400/20 shadow hover:scale-110 active:scale-95"
      title="Delete"
    >
      {/* Trash Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-red-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-6 0V5a2 2 0 012-2h2a2 2 0 012 2v2" />
      </svg>
    </button>
  </div>
))

          )}
        </div>
      </div>

    </div>
  );
}

export default Manager;

