import { motion } from "framer-motion";

export default function ProjectCardImg({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <motion.img
      key={src}
      src={src}
      className="rounded-b-xl object-fill"
      alt={alt}
      layout="position"
    />
  );
}
