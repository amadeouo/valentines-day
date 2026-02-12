import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  photo: string;
  caption: string;
}

const PhotoPage: React.FC<Props> = ({ photo, caption }) => {
  return (
    <div className="photo-page">
      <motion.div
        className="photo-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="photo-frame">
          <img
            src={photo}
            alt={caption}
            className="photo-image"
            loading='lazy'
          />
        </div>
        <motion.p
          className="photo-caption"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {caption}
          <span className="photo-emoji">📸</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PhotoPage;