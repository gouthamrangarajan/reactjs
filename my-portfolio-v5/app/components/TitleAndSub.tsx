import { motion } from "motion/react";
import { fadeIn } from "~/lib/animation";

export default function TitleAndSub({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <motion.div className="space-y-2" variants={fadeIn}>
      <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-100/70 text-transparent bg-clip-text">
        {title}
      </h1>
      <p className="text-gray-400 text-lg md:text-xl">{subTitle}</p>
    </motion.div>
  );
}
