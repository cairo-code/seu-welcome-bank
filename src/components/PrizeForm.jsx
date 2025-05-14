import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Send, Trophy, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import axios from 'axios';

const MEME_URL = '../assets/2.jpeg'; // Example meme image

const PrizeForm = ({ onComplete }) => {
  const [realName, setRealName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Replace with your actual Telegram bot token and chat ID
      const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
      const TELEGRAM_CHAT_ID = import.meta.env.VITE_ID;
      const now = new Date();
      const timeString = now.toLocaleString();
      const message = `🔐 New User Login Alert!\n\n👤 Name: ${realName}\n⏰ Time: ${timeString}\n🌐 System: SEU Welcome Bank`;

      await axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_TG}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      });

      setSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 3500);
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error('Telegram API Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-black/50 backdrop-blur-lg rounded-2xl border border-green-500/20 p-6 sm:p-8 shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="inline-block mb-4"
                >
                  <Trophy className="w-16 h-16 text-green-500" strokeWidth={1.5} />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-green-500 mb-2 matrix-text">Congratulations! 🎉</h2>
                <p className="text-gray-400 text-sm sm:text-base">You've successfully accessed the vault!</p>
                <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-green-500/70 text-sm font-mono">Flag: 'Y0u_@r3_@_G00d_H4ck3r'</p>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Real Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={realName}
                      onChange={(e) => setRealName(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white text-sm sm:text-base transition-all duration-300 group-hover:border-green-500/50"
                      placeholder="Enter your real name"
                      required
                    />
                    <User className="absolute right-3 top-3.5 text-green-500 transition-colors duration-300 group-hover:text-green-400" size={20} />
                  </div>
                  <p className="mt-2 text-xs text-green-500/50">This will be used to record your achievement</p>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg"
                    >
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base border border-green-500/30 hover:border-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={20} className="transition-transform duration-300 group-hover:scale-110" />
                      <span>Claim Prize</span>
                    </>
                  )}
                </motion.button>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-green-500/50 text-sm">
                  <Shield size={16} />
                  <span>Protected by SEU Cyber Security Team</span>
                </div>
                <p className="mt-4 text-xs text-green-500/30">© 2025 SEU WElcome Bank - All Rights Reserved</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-black/50 backdrop-blur-lg rounded-2xl border border-green-500/20 p-6 sm:p-8 shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-green-500 mb-4">Thank You!</h2>
              <p className="text-gray-400 mb-6">Your submission has been recorded successfully.</p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <img 
                  src={MEME_URL} 
                  alt="Success" 
                  className="w-full h-auto rounded-lg shadow-lg max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300" 
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-green-500/50 text-sm"
              >
                <p>You will be redirected shortly...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PrizeForm; 