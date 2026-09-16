import { useEffect, useState } from "react";
import { motion } from "motion/react";

export const GlowCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-64 h-64 bg-primary/15 rounded-full blur-[80px] pointer-events-none z-[9999] hidden md:block"
      animate={{ x: mousePos.x - 128, y: mousePos.y - 128 }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
    />
  );
};