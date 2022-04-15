import { NextPage } from "next";

const ProjectCardImg: NextPage<projectCardImgPropsType> = ({ src, alt }) => {
    return (
        <img
            key={src}
            src={src}
            className="object-fill rounded-xl"
            alt={alt}
        />

    )
}
type projectCardImgPropsType = {
    src: string;
    alt: string;
}
export default ProjectCardImg