import { motion } from "framer-motion";

export default function ProjectCardImg({
  src,
  alt,
  animate = false,
}: {
  src: string;
  alt: string;
  animate?: boolean;
}) {
  return (
    <motion.img
      key={src}
      src={src}
      className={` h-full w-full rounded-b-xl object-fill xl:h-[23.5rem] xl:w-[50rem] ${
        animate ? "revealing-image" : ""
      }`}
      alt={alt}
      layout="position"
    />
  );
}
