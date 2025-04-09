import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import * as THREE from "three";

const ParticlesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Set canvas size
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1500;
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      alphaTest: 0.001,
      opacity: 0.5,
      vertexColors: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Position camera
    camera.position.z = 5;
    
    // Mouse movement
    const mouse = new THREE.Vector2();
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / width) * 2 - 1;
      mouse.y = - (event.clientY / height) * 2 + 1;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles
      particles.rotation.y = elapsedTime * 0.05;
      
      // Mouse effect
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Get original position
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Apply subtle wave effect
        positions[i3] = x + Math.sin(elapsedTime + x) * 0.01;
        positions[i3 + 1] = y + Math.sin(elapsedTime + y) * 0.01;
        
        // React to mouse
        const mouseDistance = Math.sqrt(
          Math.pow(x - mouse.x, 2) + 
          Math.pow(y - mouse.y, 2)
        );
        
        if (mouseDistance < 0.5) {
          const factor = 0.5 - mouseDistance;
          positions[i3] += (mouse.x - x) * factor * 0.01;
          positions[i3 + 1] += (mouse.y - y) * factor * 0.01;
        }
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Render
      renderer.render(scene, camera);
      
      // Call animate again
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-10"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default ParticlesBackground;
