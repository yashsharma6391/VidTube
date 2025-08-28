import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const AnimatedLetter = ({ letter, i }) => {
  const controls = useAnimation();

  useEffect(() => {
    const runSequence = async () => {
      // 1. First animation
      await controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          delay: i * 0.25,
          duration: 0.6,
          ease: "easeOut",
        },
      });

      // 2. Wait 2s
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 3. Second pop animation
      controls.start({
        scale: [1, 1.3, 1],
        transition: {
          delay: i * 0.2, // staggered pop
          duration: 0.8,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        },
      });
    };

    runSequence();
  }, [controls, i]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={controls}
      style={{
        display: "inline-block",
        margin: "0 4px",
        transformOrigin:"center",
      }}
    >
      {letter}
    </motion.div>
  );
};

export default AnimatedLetter;
