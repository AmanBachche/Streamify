import { motion } from "motion/react";

const Shard = ({ delay, duration, size, top, left, rotate }) => (
  <motion.div
    className="absolute bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/10 backdrop-blur-[2px]"
    style={{
      width: size,
      height: 2,
      top: `${top}%`,
      left: `${left}%`,
      rotate: `${rotate}deg`,
    }}
    animate={{
      y: [0, -40, 0],
      opacity: [0.1, 0.4, 0.1],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  />
);

const AeroShards = () => {
  return (
    <div className="fixed inset-0 z-0 bg-background overflow-hidden pointer-events-none">
      {/* 1. Deep Ambient Glows (The "Vibe") */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/5 blur-[130px] rounded-full" />
      
      {/* 2. Procedural Shards */}
      <Shard size={300} top={20} left={10} rotate={15} duration={10} delay={0} />
      <Shard size={200} top={50} left={60} rotate={-25} duration={12} delay={2} />
      <Shard size={400} top={80} left={20} rotate={10} duration={15} delay={1} />
      <Shard size={250} top={10} left={70} rotate={45} duration={11} delay={3} />
      <Shard size={150} top={40} left={30} rotate={-10} duration={9} delay={5} />
      <Shard size={350} top={70} left={80} rotate={30} duration={14} delay={4} />

      {/* 3. Subtle "Dust" overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
};

export default AeroShards;