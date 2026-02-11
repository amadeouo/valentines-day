import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomePage from './components/WelcomePage';
import ValentineQuestion from './components/ValentineQuestion';
import LoveBook from './components/LoveBook';
import './styles/App.css';

type AppState = 'welcome' | 'valentine' | 'book';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-container"
          >
            <WelcomePage onComplete={() => setAppState('valentine')} />
          </motion.div>
        )}

        {appState === 'valentine' && (
          <motion.div
            key="valentine"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="page-container"
          >
            <ValentineQuestion
              onYes={() => setAppState('book')}
              onNo={() => {}} // Ничего не делает, только показывает модалку
            />
          </motion.div>
        )}

        {appState === 'book' && (
          <motion.div
            key="book"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="page-container"
          >
            <LoveBook />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;