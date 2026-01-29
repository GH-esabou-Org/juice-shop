/**
 * VULNERABLE CODE SAMPLE
 * CWE-798: Use of Hard-coded Credentials
 */

const mysql = require('mysql');
const axios = require('axios');

// 1. Hardcoded Database Credentials
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  // VULNERABILITY: Password is hardcoded in plain text
  password: 'SuperSecretPassword123!', 
  database: 'user_data'
});

dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

// 2. Hardcoded Third-Party API Key
function fetchExternalData() {
  // VULNERABILITY: API Key is hardcoded in plain text
  const apiKey = "AIzaSyD-5_NotARealKey_987654321"; 
  
  const url = `https://api.example.com/data?key=${apiKey}`;
  
  axios.get(url)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
}

fetchExternalData();
