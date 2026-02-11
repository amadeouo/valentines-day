import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const WelcomePage: React.FC<Props> = ({ onComplete }) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const greetings = [
    { emoji: "🌸", text: "машонка", color: "#FFB7C5" },
    { emoji: "🦊", text: "спящая", color: "#B5EAD7" },
    { emoji: "🐼", text: "кимпинтяо", color: "#C7CEEA" },
    { emoji: "🐨", text: "лингангули", color: "#FFDAC1" }
  ];

  useEffect(() => {
    let timeoutId: any;
    let buttonTimeoutId: any;

    const showNextGreeting = (index: number) => {
      if (index < greetings.length) {
        setCurrentGreeting(index);

        // Планируем следующий шаг
        timeoutId = setTimeout(() => {
          showNextGreeting(index + 1);
        }, 1200);
      } else {
        // Все приветствия показаны, показываем кнопку
        buttonTimeoutId = setTimeout(() => {
          setShowButton(true);
        }, 500);
      }
    };

    // Запускаем с первого приветствия (индекс 0)
    showNextGreeting(0);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(buttonTimeoutId);
    };
  }, [greetings.length]); // Зависим только от длины массива

  return (
    <div className="welcome-page">
      <div className="background-hearts">
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            className="floating-heart"
            initial={{ y: '100vh', x: Math.random() * 100 + 'vw', opacity: 0 }}
            animate={{
              y: '-20vh',
              opacity: [0, 0.8, 0],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {['❤️', '🌸', '🦊', '✨'][Math.floor(Math.random() * 4)]}
          </motion.span>
        ))}
      </div>

      <div className="welcome-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGreeting}
            className="greeting-card"
            style={{ backgroundColor: `${greetings[currentGreeting].color}20`}}
            initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="greeting-emoji"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {greetings[currentGreeting].emoji}
            </motion.div>
            <h1 className='text-animation'>{greetings[currentGreeting].text}</h1>
            <motion.div
              className="progress-dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {greetings.map((_, i) => (
                <motion.div
                  key={i}
                  className={`dot ${i === currentGreeting ? 'active' : ''}`}
                  animate={i === currentGreeting ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.button
              className="continue-button"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
            >
              Давай дальше
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WelcomePage;