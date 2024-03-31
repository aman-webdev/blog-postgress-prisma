export function generateSalt(length = 16) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      salt += charset[randomIndex];
    }
    return salt;
  }
  
  // Function to hash a password using SHA-256 and salt
  export async function hashPassword(password:string,salt:string) {
    
    // Combine password and salt
    const saltedPassword = password + salt;
    
    // Convert password to ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(saltedPassword);
    
    // Hash the password using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert the hash buffer to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    return hashedPassword
  }