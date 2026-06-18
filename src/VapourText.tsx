import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface VapourTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const VapourText: React.FC<VapourTextProps> = ({ text, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.04, 
        delayChildren: delay 
      },
    },
  };

  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-flex", marginRight: "0.25em" }}>
          {Array.from(word).map((letter, letterIndex) => {
            // Random scatter offsets for each letter
            const randomX = (Math.random() - 0.5) * 80;
            const randomY = (Math.random() - 0.5) * 80;
            
            const child = {
              visible: {
                opacity: 1,
                y: 0,
                x: 0,
                filter: "blur(0px)",
                scale: 1,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 60,
                },
              },
              hidden: {
                opacity: 0,
                y: randomY,
                x: randomX,
                filter: "blur(12px)",
                scale: 1.5,
              },
            };

            return (
              <motion.span variants={child} key={letterIndex} style={{ display: "inline-block" }}>
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </motion.div>
  );
};
