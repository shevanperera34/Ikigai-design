import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

type Props = { url: string } & JSX.IntrinsicElements['group']

export function LogoModel({ url, ...props }: Props) {
  const { scene } = useGLTF(url)

  // optional: ensure textures render correctly
  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      const mat = (mesh as any).material as THREE.Material | THREE.Material[] | undefined
      if (!mat) return
      const apply = (m: any) => {
        if (m.map) m.map.encoding = THREE.sRGBEncoding
        if (m.emissiveMap) m.emissiveMap.encoding = THREE.sRGBEncoding
      }
      Array.isArray(mat) ? mat.forEach(apply) : apply(mat)
    })
  }, [scene])

  return <primitive object={scene} {...props} />
}

// optional preloading (helps avoid first-frame pop)
useGLTF.preload('/models/ikigai-logo.glb')

