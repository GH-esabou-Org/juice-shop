/**
 * VULNERABLE CODE SAMPLE
 * CWE-547: Use of Hard-coded, Security-relevant Constants
 */

const crypto = require('crypto');

// 1. Hardcoded Salt
// VULNERABILITY: Using a fixed salt for all users makes the hashes 
// susceptible to Rainbow Table attacks. If two users have the same 
// password, they will have the exact same hash.
const GLOBAL_SALT = "a1b2c3d4e5f6"; 

function registerUser(username, password) {
    // Insecure hashing using fixed salt
    const hash = crypto.pbkdf2Sync(password, GLOBAL_SALT, 1000, 64, 'sha512').toString('hex');
    
    console.log(`User: ${username}`);
    console.log(`Stored Hash: ${hash}`);
    // Save to DB...
}


// 2. Hardcoded Initialization Vector (IV)
// VULNERABILITY: AES requires a unique, random IV for every encryption operation.
// Hardcoding this destroys the semantic security of the encryption (e.g., identical 
// plaintexts will produce identical ciphertexts).
const FIXED_IV = Buffer.from("1234567890123456"); // 16 bytes fixed
const KEY = crypto.randomBytes(32); // (Assume Key is managed securely for this example)

function encryptCreditCard(cardNumber) {
    const cipher = crypto.createCipheriv('aes-256-cbc', KEY, FIXED_IV);
    let encrypted = cipher.update(cardNumber, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return encrypted;
}

// Demonstration of the flaw
console.log("--- Password Hashing ---");
registerUser("Alice", "password123");
registerUser("Bob",   "password123"); // Will produce IDENTICAL hash to Alice

console.log("\n--- Encryption ---");
console.log(encryptCreditCard("4111222233334444"));
console.log(encryptCreditCard("4111222233334444")); // Will produce IDENTICAL ciphertext
