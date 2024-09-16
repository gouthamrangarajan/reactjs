
import { skillsV2Type } from "~/utils/schema";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import AvatarImg from "./AvatarImg";
import ScrollAnimationImg from "./ScrollAnimationImg";
import HeaderText from "../HeaderText";

export default function Header({ data }: { data: skillsV2Type }) {
  return (
    <Canvas style={{ width: "100vw" }}>
      <ScrollControls pages={1} damping={0.1}>
        <Scroll>
          <AvatarImg></AvatarImg>
          {data.imgsAndScale.map((el, idx) => (
            <ScrollAnimationImg url={el.url} key={el.url} position={data.positions[idx] as [x: number, y: number, z: number]}
              positions={data.positions as Array<[x: number, y: number, z: number]>}
              scale={el.scale}
              idx={idx}
              href={el.href}
            >
            </ScrollAnimationImg>
          ))}
        </Scroll>
        <Scroll html>
          <div className="w-screen pt-10 flex justify-center items-center flex-col gap-1">
            <HeaderText
              classes="font-semibold text-3xl h-12"
              dark
              text="Goutham Rangarajan"
            ></HeaderText>
            <HeaderText
              classes="italic font-semibold tracking-wider animate-[slide-down_0.6s_ease-in]"
              text="RG"
              dark
            ></HeaderText>
            <HeaderText
              classes="text-lg animate-[slide-down_0.9s_ease-in]"
              text="Front-end enthusiast"
              dark
            ></HeaderText>
          </div>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}

