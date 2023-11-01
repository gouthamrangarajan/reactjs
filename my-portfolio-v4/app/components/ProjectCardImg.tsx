import { motion } from "framer-motion";

export default function ProjectCardImg({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  return (
    <motion.img
      key={src}
      src={src}
      className="revealing-image h-full w-full rounded-b-xl object-fill xl:h-[23.5rem] xl:w-[50rem]"
      alt={alt}
      layout="position"
    />
  );
}
