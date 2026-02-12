import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoPage from './PhotoPage';
import { photoData } from '../data/photos';

interface Page {
  id: number;
  type: 'cover' | 'content' | 'back';
  title?: string;
  message?: string;
  photo?: {
    url: string;
    caption: string;
  };
}

const LoveBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);

  // Создаем страницы книги
  const pages: Page[] = [
    { id: 0, type: 'cover', title: 'Моя любимая девочка', message: 'Столько всего произошло, столько мы прожили вместе, хочу чтобы мы не переставили дурачиться и любили друг друга дальше и дальше' },
    ...photoData.map((photo, index) => ({
      id: index + 1,
      type: 'content' as const,
      photo: {
        url: photo.url,
        caption: photo.caption
      }
    })),
    {
      id: photoData.length + 1,
      type: 'back',
      title: 'Спасибо, что ты есть!',
      message: 'Я тебя очень люблю! 💕'
    }
  ];

  const totalPages = pages.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setCurrentPage(prev => prev + 1);
      setTimeout(() => setIsFlipping(false), 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setCurrentPage(prev => prev - 1);
      setTimeout(() => setIsFlipping(false), 600);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          prevPage();
        } else {
          nextPage();
        }
      }

      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div className="book-container">
      <div className="book-header">
        <motion.button
          className="nav-button"
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ←
        </motion.button>
        <span className="page-indicator">
          {currentPage + 1} / {totalPages}
        </span>
        <motion.button
          className="nav-button"
          onClick={nextPage}
          disabled={currentPage === totalPages - 1 || isFlipping}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          →
        </motion.button>
      </div>

      <div
        className="book"
        ref={bookRef}
        onTouchStart={handleTouchStart}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className={`book-page ${pages[currentPage].type}`}
            initial={{
              opacity: 0,
              rotateY: currentPage > 0 ? -180 : 180,
              scale: 0.8
            }}
            animate={{
              opacity: 1,
              rotateY: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              rotateY: currentPage > 0 ? 180 : -180,
              scale: 0.8
            }}
            transition={{
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            {pages[currentPage].type === 'cover' && (
              <div className="page-cover">
                <motion.div
                  className="cover-content"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="cover-emoji">❤️</div>
                  <h1>{pages[currentPage].title}</h1>
                  <p>{pages[currentPage].message}</p>
                </motion.div>
              </div>
            )}

            {pages[currentPage].type === 'content' && pages[currentPage].photo && (
              <PhotoPage
                photo={pages[currentPage].photo!.url}
                caption={pages[currentPage].photo!.caption}
              />
            )}

            {pages[currentPage].type === 'back' && (
              <div className="page-back">
                <div className="back-content">
                  <h2>{pages[currentPage].title}</h2>
                  <p>{pages[currentPage].message}</p>
                  <p>Встречаемся в 14:00 на Автозаводской</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="book-footer">
        <motion.div
          className="page-corner left"
          onClick={prevPage}
          whileTap={{ scale: 0.9 }}
        />
        <motion.div
          className="page-corner right"
          onClick={nextPage}
          whileTap={{ scale: 0.9 }}
        />
      </div>
    </div>
  );
};

export default LoveBook;