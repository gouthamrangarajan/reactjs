import { motion } from "motion/react";
import { fadeIn } from "~/lib/animation";

export default function Media({
  items,
}: {
  items: Array<{
    name: string;
    imgSrc: string;
    height: number;
    width: number;
    url: string;
  }>;
}) {
  return (
    <motion.div
      className="flex gap-5 text-gray-400 items-center"
      variants={fadeIn}
    >
      {items.map((item, index) => (
        <motion.a
          key={index}
          href={item.url}
          target="_blank"
          className="hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            alt={item.name}
            src={item.imgSrc}
            height={item.height}
            width={item.width}
          />
        </motion.a>
      ))}
    </motion.div>
  );
}
