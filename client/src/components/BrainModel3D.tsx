import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore - OrbitControls is part of three.js examples
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface BrainModel3DProps {
  className?: string;
}

const BrainModel3D = ({ className = '' }: BrainModel3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const brainModelRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0a0a0a');

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 5;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.enableZoom = false;

    // Create a simplified brain model with geometric shapes
    const brainGroup = new THREE.Group();
    brainModelRef.current = brainGroup;

    // Create cerebrum (main brain mass) with a modified sphere
    const cerebrumGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const cerebralVertices = cerebrumGeometry.attributes.position;
    
    // Add random displacement to vertices to create brain-like wrinkles
    const positionArray = cerebralVertices.array as Float32Array;
    for (let i = 0; i < positionArray.length; i += 3) {
      const noise = 0.15 * Math.sin(10 * positionArray[i]) * Math.cos(10 * positionArray[i + 1]);
      positionArray[i] += noise;
      positionArray[i + 1] += noise;
      positionArray[i + 2] += noise;
    }
    
    cerebrumGeometry.computeVertexNormals();
    
    const cerebrumMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5a9bc,  // Pink brain color
      roughness: 0.7,
      metalness: 0.2,
      wireframe: false,
    });
    
    const cerebrum = new THREE.Mesh(cerebrumGeometry, cerebrumMaterial);
    brainGroup.add(cerebrum);

    // Create cerebellum (back part of brain)
    const cerebellumGeometry = new THREE.SphereGeometry(0.6, 32, 16);
    const cerebellumMaterial = new THREE.MeshStandardMaterial({
      color: 0xd687b3,  // Slightly different pink
      roughness: 0.6,
      metalness: 0.3,
    });
    
    const cerebellum = new THREE.Mesh(cerebellumGeometry, cerebellumMaterial);
    cerebellum.position.set(0, -1.2, -0.5);
    cerebellum.scale.set(1, 0.8, 1);
    brainGroup.add(cerebellum);

    // Create brain stem
    const stemGeometry = new THREE.CylinderGeometry(0.3, 0.15, 1, 16);
    const stemMaterial = new THREE.MeshStandardMaterial({
      color: 0xc66ba0,  // Darker pink
      roughness: 0.5,
      metalness: 0.3,
    });
    
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.set(0, -2, -0.2);
    stem.rotation.set(0.3, 0, 0);
    brainGroup.add(stem);

    // Add the brain group to the scene
    scene.add(brainGroup);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add point lights of different colors for interesting highlights
    const pointLight1 = new THREE.PointLight(0x7b68ee, 1, 10); // Purple
    pointLight1.position.set(3, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 1, 10); // Cyan
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (brainModelRef.current) {
        // Subtle floating movement
        brainModelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose geometries and materials
      if (brainModelRef.current) {
        brainModelRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            } else if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            }
          }
        });
      }
    };
  }, []);

  return <div ref={containerRef} className={`w-full h-full ${className}`}></div>;
};

export default BrainModel3D;