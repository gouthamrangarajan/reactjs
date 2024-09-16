import { Image } from "@react-three/drei";

export default function AvatarImg() {
    return (<Image url={'/my-avatar.jpg'} position={[0, 0, 0]} scale={2.5} radius={1.2} transparent>
    </Image>);

}
