import { motion } from "motion/react";

// Make sure this name is exactly AeroShards
export const AeroShards = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[100px] rounded-full" />
      
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/5 border border-white/10 backdrop-blur-[2px]"
          style={{
            width: Math.random() * 250 + 100,
            height: 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            rotate: `${Math.random() * 360}deg`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};