import { motion } from "framer-motion";
import { NextPage } from "next";

const ProjectCardImg: NextPage<projectCardImgPropsType> = ({ src, alt }) => {
    return (
        <motion.img
            key={src}
            src={src}
            className="object-fill rounded-b-xl"
            alt={alt}
            layout="position"
        />

    )
}
type projectCardImgPropsType = {
    src: string;
    alt: string;
}
export default ProjectCardImg