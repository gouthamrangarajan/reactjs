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
      <h1 className="bg-gradient-to-r from-gray-100 to-gray-100/70 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
        {title}
      </h1>
      <p className="text-lg text-gray-400 md:text-xl">{subTitle}</p>
    </motion.div>
  );
}
