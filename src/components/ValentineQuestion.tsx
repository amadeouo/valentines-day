import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';

interface Props {
  onYes: () => void;
  onNo: () => void;
}

const ValentineQuestion: React.FC<Props> = ({ onYes }) => {
  const [noCount, setNoCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [yesSize, setYesSize] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const noMessages = [
    "это че такое, жми куда надо",
    "ну ты подумай еще",
    "еще думай",
    "вспомни у кого есть твои спящие фотки",
    "кимпинтяо",
    "ахаххаха наивная",
    "не то все равно",
    "да ало там кнопка уже больше чем твое желание попасть на концерт бтс",
    "ну ладно, не больше",
    "все закончились у меня идеи"
  ];

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);

    if (noCount < noMessages.length - 1) {
      setModalMessage(noMessages[noCount]);
      setShowModal(true);

      // Увеличиваем кнопку "Да"
      setYesSize(prev => prev + 0.2);

      // Случайное движение кнопки "Нет"
      setNoPosition({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100
      });
    } else {
      // Последний отказ - показываем грустное сообщение
      setModalMessage("миша все хуйня давай по новой");
      setShowModal(true);
      setNoCount(0);
      setYesSize(1);
      setNoPosition({ x: 0, y: 0 });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="valentine-container">
      <div className="floating-hearts">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            initial={{
              left: Math.random() * 100 + '%',
              y: '100vh',
              scale: 0.5 + Math.random() * 0.5
            }}
            animate={{
              y: '-20vh',
              rotate: 360
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <motion.div
        className="question-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <motion.div
          className="question-emoji"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💝
        </motion.div>

        <h1 className="question-title">
          Will you be my Valentine?
        </h1>

        <div className="answer-buttons">
          <motion.button
            className="yes-button"
            style={{
              scale: yesSize,
              padding: `${15 * yesSize}px ${40 * yesSize}px`
            }}
            whileHover={{ scale: yesSize * 1.1 }}
            whileTap={{ scale: yesSize * 0.95 }}
            onClick={onYes}
          >
            Yes
          </motion.button>

          <motion.button
            className="no-button"
            animate={{
              x: noPosition.x,
              y: noPosition.y,
              scale: noCount > 5 ? 0.8 : 1
            }}
            transition={{ type: "spring", damping: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNoClick}
          >
            нет
          </motion.button>
        </div>

        {noCount > 2 && (
          <motion.p
            className="hint-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {noCount > 5 ? 'С каждым разом будет еще больше' : 'Жми да'}
          </motion.p>
        )}
      </motion.div>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        message={modalMessage}
      />
    </div>
  );
};

export default ValentineQuestion;