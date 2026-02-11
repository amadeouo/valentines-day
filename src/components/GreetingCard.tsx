import React from 'react';
import { motion } from 'framer-motion';

interface GreetingProps {
  greeting: {
    emoji: string;
    title: string;
    message: string;
    color: string;
  };
}

const GreetingCard: React.FC<GreetingProps> = ({ greeting }) => {
  return (
    <motion.div
      className="greeting-card"
      style={{
        background: `linear-gradient(135deg, ${greeting.color}20, white)`,
        borderColor: greeting.color
      }}
      initial={{ scale: 0.9, rotateY: 180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}
    >
      <motion.div
        className="card-emoji"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {greeting.emoji}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        {greeting.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {greeting.message}
      </motion.p>

      <motion.div
        className="card-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          className="cute-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert('Ты самая милая! 🦊✨')}
        >
          Нажми меня ❤️
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GreetingCard;