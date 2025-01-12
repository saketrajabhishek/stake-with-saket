/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const Tile = ({ hasBomb, isRevealed, onClick }) => {
  const handleClick = () => {
    if (!isRevealed) {
      onClick();
    }
  };

  return (
    <motion.div
      className={`w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 border rounded-md flex items-center justify-center cursor-pointer m-1
        ${
          isRevealed
            ? hasBomb
              ? "bg-red-500 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
            : "bg-blue-500 dark:bg-blue-700 text-white"
        }
      `}
      onClick={handleClick}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isRevealed && (hasBomb ? "💣" : "💎")}
    </motion.div>
  );
};

export default Tile;
