import CryptoJS from 'crypto-js';

// Caesar cipher
export const caesarCipher = (text: string, shift: number, decrypt = false): string => {
  if (!text) return '';
  
  // If decrypting, reverse the shift
  const actualShift = decrypt ? (26 - (shift % 26)) % 26 : shift % 26;
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    
    // Handle uppercase letters
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + actualShift) % 26) + 65);
    }
    
    // Handle lowercase letters
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + actualShift) % 26) + 97);
    }
    
    // Leave non-alphabetic characters unchanged
    return char;
  }).join('');
};

// AES encryption/decryption
export const aesEncrypt = (text: string, key: string): string => {
  if (!text || !key) return '';
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const aesDecrypt = (encryptedText: string, key: string): string => {
  if (!encryptedText || !key) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return 'Error: Could not decrypt with the provided key';
  }
};

// Base64 encoding/decoding
export const base64Encode = (text: string): string => {
  if (!text) return '';
  return btoa(encodeURIComponent(text));
};

export const base64Decode = (encodedText: string): string => {
  if (!encodedText) return '';
  try {
    return decodeURIComponent(atob(encodedText));
  } catch (error) {
    console.error('Base64 decoding error:', error);
    return 'Error: Invalid Base64 string';
  }
};

// Base32 encoding/decoding
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export const base32Encode = (text: string): string => {
  if (!text) return '';
  
  const bytes = new TextEncoder().encode(text);
  let result = '';
  let bits = 0;
  let value = 0;
  
  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      result += BASE32_ALPHABET[(value >>> bits) & 31];
    }
  }
  
  if (bits > 0) {
    result += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }
  
  // Add padding
  while (result.length % 8 !== 0) {
    result += '=';
  }
  
  return result;
};

export const base32Decode = (encodedText: string): string => {
  if (!encodedText) return '';
  
  try {
    const sanitized = encodedText.replace(/=+$/, '').toUpperCase();
    let bits = 0;
    let value = 0;
    let result = [];
    
    for (let i = 0; i < sanitized.length; i++) {
      const char = sanitized[i];
      const index = BASE32_ALPHABET.indexOf(char);
      if (index === -1) throw new Error('Invalid Base32 character');
      
      value = (value << 5) | index;
      bits += 5;
      
      if (bits >= 8) {
        bits -= 8;
        result.push((value >>> bits) & 255);
      }
    }
    
    return new TextDecoder().decode(new Uint8Array(result));
  } catch (error) {
    console.error('Base32 decoding error:', error);
    return 'Error: Invalid Base32 string';
  }
};

// URL encoding/decoding
export const urlEncode = (text: string): string => {
  if (!text) return '';
  return encodeURIComponent(text);
};

export const urlDecode = (encodedText: string): string => {
  if (!encodedText) return '';
  try {
    return decodeURIComponent(encodedText);
  } catch (error) {
    console.error('URL decoding error:', error);
    return 'Error: Invalid URL encoded string';
  }
};

export type CryptoMethod = 'caesar' | 'aes' | 'base64' | 'base32' | 'url';

export const cryptoMethods = [
  { id: 'caesar', name: 'Caesar Cipher', requiresKey: true, keyType: 'number', keyPlaceholder: 'Shift (e.g. 3)' },
  { id: 'aes', name: 'AES', requiresKey: true, keyType: 'text', keyPlaceholder: 'Secret Key' },
  { id: 'base64', name: 'Base64', requiresKey: false },
  { id: 'base32', name: 'Base32', requiresKey: false },
  { id: 'url', name: 'URL Encoding', requiresKey: false },
];

export const processText = (
  text: string, 
  method: CryptoMethod, 
  encrypt: boolean, 
  key?: string
): string => {
  switch (method) {
    case 'caesar':
      const shift = key ? parseInt(key, 10) : 0;
      return caesarCipher(text, shift, !encrypt);
    case 'aes':
      return encrypt 
        ? aesEncrypt(text, key || '')
        : aesDecrypt(text, key || '');
    case 'base64':
      return encrypt 
        ? base64Encode(text)
        : base64Decode(text);
    case 'base32':
      return encrypt 
        ? base32Encode(text)
        : base32Decode(text);
    case 'url':
      return encrypt 
        ? urlEncode(text)
        : urlDecode(text);
    default:
      return text;
  }
};
