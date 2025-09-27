import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Sphere, 
  Text3D,
  PerspectiveCamera,
  useTexture,
  Effects
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration, 
  DepthOfField,
  Noise
} from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

// Steam Particles Component
const SteamParticles = () => {
  const groupRef = useRef<THREE.Group>();
  const particlesRef = useRef<THREE.InstancedMesh>();

  const particleCount = 50;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (groupRef.current && particlesRef.current) {
      // Rotate the entire group slowly
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Animate individual particles
      for (let i = 0; i < particleCount; i++) {
        const time = state.clock.elapsedTime + i * 0.1;
        
        // Calculate position
        dummy.position.set(
          Math.sin(time * 0.5 + i) * 2,
          (time * 0.3 + i * 0.1) % 6 - 1, // Rising motion
          Math.cos(time * 0.3 + i) * 2
        );
        
        // Scale particles as they rise
        const scale = 0.1 + (dummy.position.y + 1) * 0.05;
        dummy.scale.setScalar(scale);
        
        // Fade particles as they rise
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      }
      
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
};

// Enhanced Floating Particles Component
const FloatingParticles = () => {
  const groupRef = useRef<THREE.Group>();
  const instancedMeshRef = useRef<THREE.InstancedMesh>();
  
  const particleCount = 30;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (groupRef.current && instancedMeshRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      
      for (let i = 0; i < particleCount; i++) {
        const time = state.clock.elapsedTime + i * 0.2;
        
        dummy.position.set(
          Math.sin(time * 0.3 + i) * 8,
          Math.sin(time * 0.2 + i) * 3,
          Math.cos(time * 0.3 + i) * 8
        );
        
        dummy.rotation.set(
          time * 0.1 + i,
          time * 0.15 + i,
          time * 0.05 + i
        );
        
        dummy.scale.setScalar(0.3 + Math.sin(time + i) * 0.1);
        
        dummy.updateMatrix();
        instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial 
          color="#ff8c42" 
          emissive="#ff8c42" 
          emissiveIntensity={0.2}
          metalness={0.1}
          roughness={0.3}
        />
      </instancedMesh>
    </group>
  );
};

// Enhanced Main Plate Component
const CinematicPlate = ({ scrollY }: { scrollY: number }) => {
  const plateRef = useRef<THREE.Group>();
  const riceRef = useRef<THREE.Mesh>();
  const curryRef = useRef<THREE.Mesh>();
  const rotiBowlRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (plateRef.current) {
      // Scroll-driven camera movement
      plateRef.current.position.y = -0.5 + scrollY * 0.001;
      plateRef.current.rotation.y = state.clock.elapsedTime * 0.1 + scrollY * 0.001;
    }

    // Individual food item animations
    if (riceRef.current) {
      riceRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (curryRef.current) {
      curryRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (rotiBowlRef.current) {
      rotiBowlRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={plateRef}>
      {/* Main Plate with PBR Materials */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 0.15, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Rice Bowl */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={riceRef} position={[1.2, 0.1, 0.3]} castShadow>
          <sphereGeometry args={[0.6, 20, 20]} />
          <meshStandardMaterial 
            color="#f8f8f8" 
            roughness={0.4}
            metalness={0.05}
            envMapIntensity={0.8}
          />
        </mesh>
      </Float>
      
      {/* Curry Bowl */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh ref={curryRef} position={[-1.2, 0.15, 0.3]} castShadow>
          <sphereGeometry args={[0.55, 18, 18]} />
          <meshStandardMaterial 
            color="#d97706" 
            roughness={0.3}
            metalness={0.1}
            emissive="#d97706"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
      
      {/* Roti/Bread */}
      <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={rotiBowlRef} position={[0, 0.25, 1.5]} castShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 16]} />
          <meshStandardMaterial 
            color="#f4e4bc" 
            roughness={0.6}
            metalness={0.0}
            normalScale={new THREE.Vector2(0.5, 0.5)}
          />
        </mesh>
      </Float>

      {/* Spoon */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
        <group position={[2, 0.1, -1]} rotation={[0, Math.PI / 4, 0]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.1, 1.5, 4, 8]} />
            <meshStandardMaterial 
              color="#c0c0c0" 
              metalness={0.95}
              roughness={0.05}
              envMapIntensity={2}
            />
          </mesh>
        </group>
      </Float>

      {/* Steam Particles */}
      <SteamParticles />
    </group>
  );
};

// Cinematic Lighting Setup
const CinematicLighting = () => {
  return (
    <>
      {/* Key Light */}
      <directionalLight 
        position={[10, 15, 5]} 
        intensity={2}
        color="#ffe6b3"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Fill Light */}
      <directionalLight 
        position={[-5, 10, -5]} 
        intensity={0.5}
        color="#6fb3ff"
      />
      
      {/* Rim Light */}
      <directionalLight 
        position={[0, 5, -10]} 
        intensity={0.8}
        color="#ff8c42"
      />
      
      {/* Ambient Light */}
      <ambientLight intensity={0.2} color="#ffe6b3" />
      
      {/* Point Light for Food Highlighting */}
      <pointLight 
        position={[0, 3, 0]} 
        intensity={1.5} 
        color="#ffcc66"
        distance={10}
        decay={2}
      />
    </>
  );
};

// Camera Controller for Scroll Interaction
const ScrollCamera = ({ scrollY }: { scrollY: number }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    // Dolly camera based on scroll
    const targetZ = 8 - scrollY * 0.003;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, Math.max(4, targetZ), 0.1);
    
    // Slight camera tilt
    const targetY = 2 + scrollY * 0.001;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);
    
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// Main 3D Scene Component
const Scene3D = ({ scrollY }: { scrollY: number }) => {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      shadows
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={null}>
        {/* Camera Control */}
        <ScrollCamera scrollY={scrollY} />
        
        {/* Lighting */}
        <CinematicLighting />
        
        {/* Environment Map */}
        <Environment preset="studio" />
        
        {/* 3D Objects */}
        <CinematicPlate scrollY={scrollY} />
        <FloatingParticles />
        
        {/* Post-processing Effects */}
        <EffectComposer>
          <Bloom 
            intensity={0.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
          <ChromaticAberration 
            offset={new THREE.Vector2(0.001, 0.001)}
            radialModulation={false}
            modulationOffset={0}
          />
          <DepthOfField 
            focusDistance={0.02}
            focalLength={0.05}
            bokehScale={3}
          />
          <Noise 
            opacity={0.03}
            blendFunction={BlendFunction.MULTIPLY}
          />
        </EffectComposer>
        
        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          enableDamping
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
};

// Enhanced Cinematic Hero Component
const CinematicHero3D = ({ scrollY }: { scrollY: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 w-full h-screen overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Scene3D scrollY={scrollY} />
      </div>
      
      {/* Particle overlay effect */}
      <div className="particle-container">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="steam-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
            animate={{
              y: [-100, -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20 pointer-events-none" />
      
      {/* Hero Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          className="text-center space-y-6 px-4"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-display font-bold text-primary drop-shadow-2xl leading-tight"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            SRM IST
          </motion.h1>
          <motion.h2 
            className="text-4xl md:text-6xl font-serif font-semibold text-accent drop-shadow-lg"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            Hostel Mess
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-muted drop-shadow-lg max-w-3xl mx-auto font-medium"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            Experience cinematic dining with gamified feedback, 3D interactions, and immersive menu exploration
          </motion.p>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
        <p className="text-primary text-sm mt-2 font-medium">Scroll to explore</p>
      </motion.div>
    </motion.div>
  );
};

export default CinematicHero3D;