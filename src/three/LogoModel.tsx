// src/three/LogoModel.tsx
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

type Props = { url: string } & ThreeElements["group"];

export function LogoModel({ url, ...props }: Props) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((obj: THREE.Object3D) => {
      if (!(obj as THREE.Mesh).isMesh) return;

      const mesh = obj as THREE.Mesh;
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (!mat) return;

      const apply = (m: THREE.Material) => {
        const anyM = m as any;

        if (anyM.map && "colorSpace" in anyM.map) {
          anyM.map.colorSpace = THREE.SRGBColorSpace;
        }
        if (anyM.emissiveMap && "colorSpace" in anyM.emissiveMap) {
          anyM.emissiveMap.colorSpace = THREE.SRGBColorSpace;
        }
      };

      Array.isArray(mat) ? mat.forEach(apply) : apply(mat);
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/ikigai-logo.glb");
