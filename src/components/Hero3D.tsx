import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text3D, Float, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Floating Rice Particles Component
const FloatingParticles = () => {
  const groupRef = useRef<THREE.Group>();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }, (_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 10,
          ]}
        >
          <Sphere args={[0.05]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.1} />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

// Main Plate Component
const Plate = () => {
  const plateRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (plateRef.current) {
      plateRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      {/* Main Plate */}
      <mesh ref={plateRef} position={[0, -0.5, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Food on Plate */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial 
            color="#ff6b35" 
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </Float>
      
      {/* Rice Bowl */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh position={[1.5, 0.2, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial 
            color="#f8f8f8" 
            roughness={0.4}
          />
        </mesh>
      </Float>
      
      {/* Curry Bowl */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh position={[-1.5, 0.2, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial 
            color="#d97706" 
            roughness={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
};

// 3D Scene Component
const Scene3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b35" />
        
        {/* Environment */}
        <Environment preset="studio" />
        
        {/* 3D Objects */}
        <Plate />
        <FloatingParticles />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
};

const Hero3D = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-[60vh] overflow-hidden"
    >
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
            SRM IST
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold text-primary-glow drop-shadow-lg">
            Hostel Mess
          </h2>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-2xl mx-auto">
            Delicious meals, daily menus, and gamified feedback
          </p>
        </motion.div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 z-5" />
    </motion.div>
  );
};

export default Hero3D;