import React, { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, ContactShadows, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function FitLogo({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const group = useRef<THREE.Group>(null)
  const { camera } = useThree()

  const { centered, scale } = useMemo(() => {
    const s = scene.clone(true)
    const box = new THREE.Box3().setFromObject(s)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    s.position.sub(center) // center

    // 🔽 make longest side ~2.2 units
    const longest = Math.max(size.x, size.y, size.z)
    const target = 2.2
    const sc = longest > 0 ? target / longest : 1

    // 🔽 stand upright: rotate +90° around X so the front faces camera
    s.rotation.x = Math.PI / 2
    // if it’s mirrored, try s.rotation.y = Math.PI as well

    return { centered: s, scale: sc }
  }, [scene])

  useEffect(() => {
    camera.position.set(0, 0.8, 4)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera])

  // 🔽 nudge it down a bit so it sits in the beam nicely
  return <primitive ref={group} object={centered} scale={scale} position={[0, -0.15, 0]} />
}


useGLTF.preload('/models/ikigai-logo.glb')

export function LogoCanvas({ modelPath = '/models/ikigai-logo.glb' }: { modelPath?: string }) {
  return (
    // Visually invisible container: only sets a size and keeps clicks for elements below
    <div className="pointer-events-none mx-auto w-[clamp(240px,36vw,560px)] h-[clamp(200px,28vw,420px)]">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ fov: 45, near: 0.1, far: 100 }}
      >
        {/* lighting that feels like the spotlight above */}
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[0, 5, 2]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={null}>
          <FitLogo url={modelPath} />
          <Environment preset="city" />
          {/* soft pool under the logo so it sits in the scene */}
          <ContactShadows
            position={[0, -0.95, 0]}
            opacity={0.28}
            blur={2.6}
            far={6}
            scale={8}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

