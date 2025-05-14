import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  AlertCircle, 
  Key,
  Building2,
  UserCircle2,
  Fingerprint,
  CheckCircle2,
  Clock,
  Server,
  Copy,
  Check,
  Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PrizeForm from './PrizeForm';
import firstImage from '../assets/1.jpeg';
import secondImage from '../assets/2.jpeg';

const MatrixEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%^&*()';
    const fontSize = Math.max(10, Math.min(14, window.innerWidth / 100));
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedUsername, setCopiedUsername] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [flag, setFlag] = useState('');
  const [flagError, setFlagError] = useState('');
  const navigate = useNavigate();

  // Correct credentials
  const CORRECT_USERNAME = '13371337'; // Original username
  const CORRECT_PASSWORD = 'HEX_IS_MAGIC'; // Original password
  const ENCRYPTED_USERNAME = '.---- ...-- ...-- --... .---- ...-- ...-- --...'; // Username in Morse
  const ENCRYPTED_PASSWORD = 'KHA_LV_PDJLF'; // Password in Caesar Cipher Shift 3
  const CORRECT_FLAG = 'SEU{Y0u_@r3_@_G00d_H4ck3r}';

  const handleCopy = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      setStep(2);
      setError('');
    } else {
      setError('Invalid credentials. Try decoding the hints above.');
    }
    setIsLoading(false);
  };

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
    setFlagError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (flag === CORRECT_FLAG) {
      setIsLoggedIn(true);
    } else {
      setFlagError('Incorrect flag. Look deeply where google spiders are afraid to tread');
    }
    setIsLoading(false);
  };

  const handlePrizeComplete = () => {
    console.log('Prize claimed successfully');
  };

  if (isLoggedIn) {
    return <PrizeForm onComplete={handlePrizeComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden p-4">
      <MatrixEffect />
      
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/50 backdrop-blur-lg rounded-2xl border border-green-500/20 p-6 sm:p-8 shadow-2xl"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <Building2 className="w-16 h-16 text-green-500" strokeWidth={1.5} />
                </motion.div>
                <h1 className="text-2xl sm:text-3xl font-bold text-green-500 mb-2 matrix-text">SEU Bank</h1>
                <p className="text-gray-400 text-sm sm:text-base">Secure Vault Access Portal</p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4"
                >
                  <div className="flex items-center gap-1 text-xs text-green-300">
                    <Fingerprint size={14} />
                    <span>Step {step}/2: {step === 1 ? 'Decode and enter credentials' : 'Find the flag where wikipedia tell robots what to do'}</span>
                  </div>
                </motion.div>
              </div>

              {step === 1 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 p-4 bg-green-500/5 rounded-xl border border-green-500/20"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-green-500 mb-1">Mr. Morse left your username in his morse code</p>
                          <p className="text-sm font-mono text-green-400">{ENCRYPTED_USERNAME}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(ENCRYPTED_USERNAME, setCopiedUsername)}
                          className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
                        >
                          {copiedUsername ? (
                            <Check className="text-green-500" size={16} />
                          ) : (
                            <Copy className="text-green-500" size={16} />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-green-500 mb-1">Cesar left your password in his shift 3 cipher</p>
                          <p className="text-sm font-mono text-green-400">{ENCRYPTED_PASSWORD}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(ENCRYPTED_PASSWORD, setCopiedPassword)}
                          className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
                        >
                          {copiedPassword ? (
                            <Check className="text-green-500" size={16} />
                          ) : (
                            <Copy className="text-green-500" size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2"
                      >
                        <AlertCircle className="text-red-500" size={20} />
                        <span className="text-red-500 text-sm">{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Account Number
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white font-mono text-sm sm:text-base transition-all duration-300 group-hover:border-green-500/50"
                          placeholder="Enter decoded account number"
                          pattern="[0-9]*"
                          maxLength="12"
                        />
                        <UserCircle2 className="absolute right-3 top-3.5 text-green-500 transition-colors duration-300 group-hover:text-green-400" size={20} />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Vault Key
                      </label>
                      <div className="relative group">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white font-mono text-sm sm:text-base transition-all duration-300 group-hover:border-green-500/50"
                          placeholder="Enter decoded vault key"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3.5 text-green-500 transition-colors duration-300 hover:text-green-400"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base border border-green-500/30 hover:border-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Lock size={20} />
                        </motion.div>
                      ) : (
                        <>
                          <Lock size={20} />
                          Access Vault
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mb-6">
                    <img src={firstImage} alt="Find the flag" className="w-full h-auto rounded-lg mb-4" />
                  </div>
                  <div className="p-6 bg-green-500/5 rounded-xl border border-green-500/20 text-center">
                    <h3 className="text-lg font-medium text-green-500 mb-4">Step 2: Find the Flag</h3>
                    <p className="text-gray-400 mb-6">You've successfully accessed the vault! Now, enter the flag you earned</p>
                    
                    <form onSubmit={handleFlagSubmit} className="space-y-4">
                      <div className="relative group">
                        <input
                          type="text"
                          value={flag}
                          onChange={(e) => setFlag(e.target.value)}
                          className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white font-mono text-sm sm:text-base transition-all duration-300 group-hover:border-green-500/50"
                          placeholder="Enter the flag you earned"
                        />
                        <Key className="absolute right-3 top-3.5 text-green-500 transition-colors duration-300 group-hover:text-green-400" size={20} />
                      </div>

                      {flagError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg"
                        >
                          <AlertCircle size={16} />
                          <span>{flagError}</span>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Shield size={18} className="transition-transform duration-300 group-hover:scale-110" />
                            <span>Verify Flag</span>
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-6 p-4 bg-black/30 rounded-lg">
                      <h3 className="text-lg font-medium text-green-500 mb-4 text-center">Hint</h3>
                      <div className="space-y-2 text-gray-400 text-sm">
                        <p>• how does wikipedia tell robots what to do ?</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-black/50 backdrop-blur-lg rounded-2xl border border-green-500/20 p-6 sm:p-8 shadow-2xl text-center"
            >
              <div className="mb-6">
                <img src={secondImage} alt="Success" className="w-full h-auto rounded-lg mb-4" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Shield className="w-10 h-10 text-green-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-green-500 mb-4">Access Granted!</h2>
              <p className="text-gray-400 mb-6">Welcome to the secure vault. Your credentials have been verified.</p>
              <div className="flex items-center justify-center gap-2 text-green-500/50 text-sm">
                <Shield size={16} />
                <span>Protected by SEU Cyber Security Team</span>
              </div>
              <p className="mt-4 text-xs text-green-500/30">© 2025 SEU WElcome Bank - All Rights Reserved</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage; 