import { type ImageProps, useScroll, Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from 'maath'
import THREE from "three";

export default function ScrollAnimationImg(props: ImageClickableProps) {
    const scroll = useScroll();
    useFrame((_, delta) => {
        const offsetIdx = calculateOffsetIdx({ scrollOffset: scroll.offset, currIdx: props.idx })
        const toPosition = getPosition({ currIdx: offsetIdx, positions: props.positions });
        easing.damp3(el.current.position, toPosition, 0.3, delta);
    });
    const el = useRef<THREE.Mesh>(null!);
    return (
        <Image
            ref={el}
            {...props}
            onClick={() => {
                if (props.href) {
                    window.open(props.href, "_blank");
                }
            }}
            transparent
        >
        </Image>);
}

type ImageClickableProps = ImageProps & {
    href?: string,
    idx: number,
    positions: Array<[x: number, y: number, z: number]>,
}

function getPosition({ currIdx, positions }: { currIdx: number, positions: Array<[x: number, y: number, z: number]> }) {
    const idxToReturn = (currIdx) % positions.length;
    return positions[idxToReturn];
}

function calculateOffsetIdx({ scrollOffset, currIdx }: { scrollOffset: number, currIdx: number }) {
    let ret = currIdx;
    if (scrollOffset > 0.96) {
        ret = currIdx + 12;
    }
    else if (scrollOffset > 0.88) {
        ret = currIdx + 11;
    }
    else if (scrollOffset > 0.80) {
        ret = currIdx + 10;
    }
    else if (scrollOffset > 0.72) {
        ret = currIdx + 9;
    }
    else if (scrollOffset > 0.64) {
        ret = currIdx + 8;
    }
    else if (scrollOffset > 0.56) {
        ret = currIdx + 7;
    }
    else if (scrollOffset > 0.48) {
        ret = currIdx + 6;
    }
    else if (scrollOffset > 0.40) {
        ret = currIdx + 5;
    }
    else if (scrollOffset > 0.32) {
        ret = currIdx + 4;
    }
    else if (scrollOffset > 0.24) {
        ret = currIdx + 3;
    }
    else if (scrollOffset > 0.16) {
        ret = currIdx + 2;
    }
    else if (scrollOffset > 0.08) {
        ret = currIdx + 1;
    }
    return ret;
}