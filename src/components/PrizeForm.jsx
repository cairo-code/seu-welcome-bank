import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Send, Trophy, CheckCircle } from 'lucide-react';
import axios from 'axios';

const MEME_URL = 'https://i.imgflip.com/30b1gx.jpg'; // Example meme image

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
      const message = `🔐 New User Login Alert!\n\n👤 Name: ${realName}\n⏰ Time: ${timeString}\n🌐 System: Ancient Scrolls Terminal`;

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-4 sm:p-8 bg-black/50 backdrop-blur-lg rounded-lg border border-green-500/30 shadow-lg shadow-green-500/20"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
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
          <Trophy className="text-4xl text-green-500" />
        </motion.div>
        <h2 className="text-xl sm:text-2xl font-bold text-green-500 mb-2">Congratulations! 🎉</h2>
        <p className="text-gray-400 text-sm sm:text-base">You've successfully accessed the vault!</p>
        <p className="text-green-500/70 text-xs mt-2">Flag: 'Y0u_@r3_@_G00d_H4ck3r'</p>
      </motion.div>

      {success ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-green-500"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <CheckCircle className="text-4xl mx-auto" />
          </motion.div>
          <p className="text-lg">Thank you for participating!</p>
          <p className="text-sm mt-2">Your submission has been recorded.</p>
          <img src={MEME_URL} alt="Meme" className="mx-auto mt-6 rounded-lg shadow-lg max-w-xs" />
          <p className="text-xs mt-4 text-green-500/50">You will be redirected shortly...</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Real Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-green-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white text-sm sm:text-base"
                placeholder="Enter your Real name"
                required
              />
              <User className="absolute right-3 top-2.5 text-green-500" size={20} />
            </div>
            <p className="mt-1 text-xs text-green-500/30">This will be used to record your achievement</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-500 text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full py-3 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 text-sm sm:text-base"
            type="submit"
          >
            <Send size={20} />
            {isSubmitting ? 'Submitting...' : 'Claim Prize'}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default PrizeForm; 