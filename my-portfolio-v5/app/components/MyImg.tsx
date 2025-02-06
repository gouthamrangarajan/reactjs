import { motion } from "motion/react";

export default function MyImg() {
  return (
    <motion.div
      className="relative mx-auto aspect-square max-w-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <img
        src="/my-avatar.jpg"
        alt="Profile"
        width={300}
        height={300}
        className="relative rounded-full border-4 border-gray-800"
      />
    </motion.div>
  );
}
