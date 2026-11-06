import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  BufferGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  OctahedronGeometry,
  Object3D,
  PlaneGeometry,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  EquirectangularReflectionMapping,
  Texture,
  TextureLoader,
  TorusGeometry,
  TorusKnotGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  DodecahedronGeometry,
} from 'three';
import type { Material } from 'three';
import { assets } from '../config/assets';

type HeroScene3DProps = {
  active: boolean;
};

function disposeScene(root: Object3D) {
  root.traverse((object) => {
    if (object instanceof Mesh || object instanceof Line || object instanceof Points) {
      object.geometry.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material: Material) => material.dispose());
    }
  });
}

export default function HeroScene3D({ active }: HeroScene3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<(() => void) | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = active;
    if (active) startRef.current?.();
    else stopRef.current?.();
  }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch (error) {
      console.error('Unable to initialize the hero WebGL scene.', error);
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    scene.add(new AmbientLight(0xc9f7ff, 1.3));
    const keyLight = new DirectionalLight(0xd5fbff, 2.4);
    keyLight.position.set(4, 5, 3);
    scene.add(keyLight);
    const cyanLight = new DirectionalLight(0x45eaf4, 2.8);
    cyanLight.position.set(-4, 1, 4);
    scene.add(cyanLight);

    const composition = new Group();
    scene.add(composition);
    const floatingObjects: Array<{ object: Mesh; y: number; speed: number; amplitude: number }> = [];
    let disposed = false;
    let environmentTexture: Texture | null = null;
    let gridTexture: Texture | null = null;

    const textureLoader = new TextureLoader();
    textureLoader.load(
      assets.threeD.heroEnvironment,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = SRGBColorSpace;
        texture.mapping = EquirectangularReflectionMapping;
        environmentTexture = texture;
        scene.environment = texture;
      },
      undefined,
      (error) => {
        if (!disposed) console.error('Unable to load the 3D hero environment.', error);
      },
    );
    textureLoader.load(
      assets.threeD.cyanGridTexture,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = SRGBColorSpace;
        gridTexture = texture;
        const grid = new Mesh(
          new PlaneGeometry(6.4, 4.2),
          new MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.16, depthWrite: false }),
        );
        grid.position.set(0, 0, -2.2);
        scene.add(grid);
      },
      undefined,
      (error) => {
        if (!disposed) console.error('Unable to load the 3D hero grid texture.', error);
      },
    );
    const makeMaterial = (color: number, metalness: number, roughness: number, emissive = 0x000000) =>
      new MeshStandardMaterial({ color, metalness, roughness, emissive, emissiveIntensity: emissive ? 0.22 : 0 });

    const core = new Mesh(
      new TorusKnotGeometry(0.82, 0.045, 160, 12, 2, 3),
      makeMaterial(0x45eaf4, 0.82, 0.18, 0x45eaf4),
    );
    core.rotation.set(0.4, 0.25, -0.3);
    composition.add(core);
    floatingObjects.push({ object: core, y: 0, speed: 0.65, amplitude: 0.04 });

    const wireframe = new Mesh(
      new IcosahedronGeometry(0.52, 1),
      new MeshStandardMaterial({ color: 0xd9fbff, metalness: 0.9, roughness: 0.15, wireframe: true }),
    );
    wireframe.position.z = -0.5;
    wireframe.rotation.set(0.6, 0.2, 0.25);
    composition.add(wireframe);

    const crystal = new Mesh(
      new DodecahedronGeometry(0.47, 0),
      makeMaterial(0x0b3150, 0.78, 0.2, 0x1688a2),
    );
    crystal.position.set(-1.42, 0.82, -0.4);
    crystal.rotation.set(0.2, 0.25, -0.25);
    composition.add(crystal);
    floatingObjects.push({ object: crystal, y: 0.82, speed: 0.9, amplitude: 0.12 });

    const shard = new Mesh(
      new OctahedronGeometry(0.54, 1),
      new MeshStandardMaterial({ color: 0xa6f4ff, metalness: 0.9, roughness: 0.14, wireframe: true }),
    );
    shard.position.set(1.45, -0.66, -0.3);
    shard.rotation.set(0.4, 0.3, 0.1);
    composition.add(shard);
    floatingObjects.push({ object: shard, y: -0.66, speed: 0.72, amplitude: 0.1 });

    const ring = new Mesh(
      new TorusGeometry(0.38, 0.012, 8, 48),
      new MeshStandardMaterial({ color: 0x45eaf4, emissive: 0x45eaf4, emissiveIntensity: 0.4, transparent: true, opacity: 0.72 }),
    );
    ring.position.set(-1.55, -0.8, -1.05);
    ring.rotation.set(0.2, 0.45, 0.3);
    composition.add(ring);

    const trail = new Line(
      new BufferGeometry().setFromPoints([
        new Vector3(-2.3, -0.1, -1.3),
        new Vector3(-1.4, 0.65, -0.6),
        new Vector3(-0.5, 0.2, -0.55),
        new Vector3(0.2, 0.75, -0.6),
        new Vector3(1.15, 0.45, -0.55),
        new Vector3(2.25, 1.15, -1.2),
      ]),
      new LineBasicMaterial({ color: 0x45eaf4, transparent: true, opacity: 0.42 }),
    );
    composition.add(trail);

    const particlePositions = new Float32Array([
      -2, 1.25, -1, -0.95, -1.2, -0.7, 0.9, 1.3, -1.1, 2, -0.05, -0.8,
      0.3, -1.3, -1.2, -2.35, -0.35, -0.6, 2.05, 0.85, -1.1, -1.8, 0.1, -0.8,
    ]);
    const particleGeometry = new BufferGeometry();
    particleGeometry.setAttribute('position', new Float32BufferAttribute(particlePositions, 3));
    composition.add(new Points(particleGeometry, new PointsMaterial({ color: 0xc2fbff, size: 0.045, sizeAttenuation: true })));

    const pointer = new Vector2();
    const targetPointer = new Vector2();
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      targetPointer.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
      );
    };
    const onPointerLeave = () => targetPointer.set(0, 0);
    host.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerleave', onPointerLeave);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    let lastFrameTime = 0;
    let elapsed = 0;
    const draw = (time: number) => {
      if (!activeRef.current) {
        frameRef.current = null;
        return;
      }

      const delta = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 0.04) : 0;
      lastFrameTime = time;
      elapsed += delta;
      pointer.lerp(targetPointer, Math.min(delta * 2.2, 1));
      composition.rotation.y += ((pointer.x * 0.22 + Math.sin(elapsed * 0.16) * 0.12) - composition.rotation.y) * Math.min(delta * 2.2, 1);
      composition.rotation.x += ((-pointer.y * 0.15 + Math.cos(elapsed * 0.18) * 0.08) - composition.rotation.x) * Math.min(delta * 2.2, 1);
      composition.position.x += (pointer.x * 0.16 - composition.position.x) * Math.min(delta * 1.5, 1);
      composition.position.y += (pointer.y * 0.12 - composition.position.y) * Math.min(delta * 1.5, 1);
      floatingObjects.forEach(({ object, y, speed, amplitude }) => {
        object.position.y = y + Math.sin(elapsed * speed) * amplitude;
        object.rotation.x += delta * speed * 0.12;
      });

      renderer.render(scene, camera);
      frameRef.current = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
    const start = () => {
      if (frameRef.current === null && activeRef.current && document.visibilityState === 'visible') {
        lastFrameTime = 0;
        frameRef.current = window.requestAnimationFrame(draw);
      }
    };
    startRef.current = start;
    stopRef.current = stop;

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') start();
      else stop();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    start();

    return () => {
      disposed = true;
      stop();
      startRef.current = null;
      stopRef.current = null;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      resizeObserver.disconnect();
      disposeScene(scene);
      environmentTexture?.dispose();
      gridTexture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="hero-canvas" aria-hidden="true" />;
}
