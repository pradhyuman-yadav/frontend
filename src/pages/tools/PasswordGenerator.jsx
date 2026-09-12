import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../components/Toast';

/**
 * Draws `count` characters uniformly from `charset` using the Web Crypto API.
 * Rejection sampling removes the modulo bias a plain `% charset.length` has.
 */
const randomChars = (charset, count) => {
  const max = Math.floor(256 / charset.length) * charset.length;
  let out = '';

  while (out.length < count) {
    const bytes = new Uint8Array(count - out.length);
    crypto.getRandomValues(bytes);
    for (const byte of bytes) {
      if (byte < max) out += charset.charAt(byte % charset.length);
      if (out.length === count) break;
    }
  }

  return out;
};

const PasswordGenerator = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);

  const generatePassword = () => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (excludeSimilar) {
      charset = charset.replace(/[0O1lI]/g, '');
    }
    
    if (charset === '') {
      toast('Please select at least one character type');
      return;
    }
    
    // crypto.getRandomValues, not Math.random: this tool exists to produce
    // secure passwords, and Math.random is not cryptographically secure.
    // Values above the largest whole multiple of charset.length are rejected
    // so the modulo does not bias the first characters of the set.
    const generatedPassword = randomChars(charset, length);

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast('Password copied to clipboard!');
  };

  const clearAll = () => {
    setPassword('');
    setLength(12);
  };

  const calculateStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score <= 2) return { level: 'Weak', color: '#f44336' };
    if (score <= 4) return { level: 'Medium', color: '#ff9800' };
    return { level: 'Strong', color: '#4caf50' };
  };

  const strength = password ? calculateStrength(password) : null;

  return (
    <div className="tool-page">
      <div className="tool-header">
        <button 
          className="back-button" 
          onClick={() => navigate('/tools')}
        >
          ← Back to Tools
        </button>
        <h1 className="tool-page-title">Password Generator</h1>
      </div>

      <div className="tool-content">
        <div className="tool-description">
          <p>
            Generate secure passwords with customizable options. Choose length, character types, 
            and exclude similar characters for maximum security.
          </p>
        </div>

        <div className="tool-interface">
          <div className="settings-section">
            <div className="setting-group">
              <label htmlFor="length">Password Length: {length}</label>
              <input
                type="range"
                id="length"
                min="4"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
              />
            </div>

            <div className="setting-group">
              <label>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                Include Uppercase Letters (A-Z)
              </label>
            </div>

            <div className="setting-group">
              <label>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                Include Lowercase Letters (a-z)
              </label>
            </div>

            <div className="setting-group">
              <label>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Include Numbers (0-9)
              </label>
            </div>

            <div className="setting-group">
              <label>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols (!@#$%^&*)
              </label>
            </div>

            <div className="setting-group">
              <label>
                <input
                  type="checkbox"
                  checked={excludeSimilar}
                  onChange={(e) => setExcludeSimilar(e.target.checked)}
                />
                Exclude Similar Characters (0, O, 1, l, I)
              </label>
            </div>

            <div className="action-buttons">
              <button
                className="generate-button"
                onClick={generatePassword}
              >
                Generate Password
              </button>

              <button
                className="clear-button"
                onClick={clearAll}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="output-section">
            <label htmlFor="password">Generated Password:</label>
            <div className="password-container">
              <input
                type="text"
                id="password"
                value={password}
                readOnly
                placeholder="Your generated password will appear here..."
              />
              {password && (
                <button 
                  className="copy-button"
                  onClick={copyToClipboard}
                >
                  Copy
                </button>
              )}
            </div>
            
            {strength && (
              <div className="strength-indicator">
                <span>Password Strength: </span>
                <span 
                  className="strength-level"
                  style={{ color: strength.color }}
                >
                  {strength.level}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="tool-info">
          <h3>Password Security Tips</h3>
          <ul>
            <li><strong>Length:</strong> Use at least 12 characters for better security</li>
            <li><strong>Variety:</strong> Include uppercase, lowercase, numbers, and symbols</li>
            <li><strong>Uniqueness:</strong> Use different passwords for different accounts</li>
            <li><strong>Regular Updates:</strong> Change passwords periodically</li>
            <li><strong>Storage:</strong> Use a password manager to store passwords securely</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
