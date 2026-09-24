"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { speakTamil } from "@/lib/tts";
import {
  Sun,
  Moon,
  CloudRain,
  Maximize2,
  Minimize2,
  Sparkles,
  Volume2,
  Camera,
} from "lucide-react";

interface RhymeScene3DProps {
  onObjectSelect: (objectId: string) => void;
  selectedObjectId: string | null;
  activeActionObject: string | null;
}

// Map of interactive 3D world objects with rich cultural annotations & Tamil script
export const WORLD_OBJECT_INFO: Record<
  string,
  { titleTa: string; titleTr: string; titleEn: string; desc: string }
> = {
  elephant: {
    titleTa: "யானை",
    titleTr: "Yaanai",
    titleEn: "Elephant",
    desc: "A majestic Tamil elephant enjoying the refreshing rain shower in the village.",
  },
  umbrella: {
    titleTa: "குடை",
    titleTr: "Kudai",
    titleEn: "Umbrella",
    desc: "A bright protective purple umbrella held over the elephant.",
  },
  peacock: {
    titleTa: "மயில்",
    titleTr: "Mayil",
    titleEn: "Peacock",
    desc: "The national bird of India, dancing proudly on the rocky granite ridge.",
  },
  bull: {
    titleTa: "காளை / மாடு",
    titleTr: "Kaalai / Maadu",
    titleEn: "Village Bull",
    desc: "A honored agricultural bull grazing peacefully near the wooden river bridge.",
  },
  river: {
    titleTa: "ஆறு & தாமரை",
    titleTr: "Aaru & Thaamarai",
    titleEn: "River & Lotus",
    desc: "A crystal clear winding river with drifting lotus flowers and leaping silver fish.",
  },
  bridge: {
    titleTa: "மரப் பாலம்",
    titleTr: "Marap Paalam",
    titleEn: "Wooden Bridge",
    desc: "A traditional handcrafted timber bridge connecting the village paths.",
  },
  house: {
    titleTa: "கிராம வீடு",
    titleTr: "Giraama Veedu",
    titleEn: "Tamil Village House",
    desc: "A traditional tiled-roof home decorated with threshold rice Kolam art.",
  },
  monument: {
    titleTa: "தமிழ் கல் தூண்",
    titleTr: "Tamil Kal Thoon",
    titleEn: "Granite Monument",
    desc: "A carved stone monolith inscribed with eternal virtues: Aram (Righteousness), Porul (Wealth), and Inbam (Love).",
  },
  palm: {
    titleTa: "பனை மரம்",
    titleTr: "Panai Maram",
    titleEn: "Palmyra Palm Tree",
    desc: "The official state tree of Tamil Nadu, famous for nutritious Nungu fruit and palm leaves.",
  },
  banyan: {
    titleTa: "ஆலமரம்",
    titleTr: "Aalamaram",
    titleEn: "Banyan Tree",
    desc: "A ancient shady banyan tree with aerial hanging roots providing shelter to village gatherings.",
  },
  coconut: {
    titleTa: "தென்னை மரம்",
    titleTr: "Thennai Maram",
    titleEn: "Coconut Tree",
    desc: "A tall tropical coconut palm tree with sweet tender coconuts (Elaneer).",
  },
  hut: {
    titleTa: "குடில்",
    titleTr: "Kudil",
    titleEn: "Thatched Hut",
    desc: "A traditional straw-thatched village hut built with woven bamboo.",
  },
  temple: {
    titleTa: "கோவில் கோபுரம்",
    titleTr: "Kovil Gopuram",
    titleEn: "Temple Tower",
    desc: "A magnificent multi-tiered South Indian Dravidian temple tower with golden Kalasam spires.",
  },
  drum: {
    titleTa: "பறை / மேளம்",
    titleTr: "Parai / Melam",
    titleEn: "Folk Drum",
    desc: "An ancient Tamil folk percussion instrument played during joyful cultural festivals.",
  },
  pot: {
    titleTa: "மண் பானை",
    titleTr: "Mann Paanai",
    titleEn: "Clay Pot",
    desc: "Handmade terracotta clay pot used during Thai Pongal celebrations.",
  },
  field: {
    titleTa: "நெற்பயிர்",
    titleTr: "Nerpayir",
    titleEn: "Paddy Crop Field",
    desc: "Lush green agricultural rice paddy field symbolizing farmer prosperity.",
  },
  lamp: {
    titleTa: "அகல் விளக்கு",
    titleTr: "Agal Vilakku",
    titleEn: "Oil Lamp",
    desc: "A traditional terracotta oil lamp radiating warm golden light.",
  },
  boat: {
    titleTa: "பரிசல் / படகு",
    titleTr: "Parisal / Padagu",
    titleEn: "Coracle Boat",
    desc: "A circular woven coracle boat used for navigating Tamil rivers.",
  },
  sun: {
    titleTa: "சூரியன்",
    titleTr: "Sooriyan",
    titleEn: "Sun",
    desc: "The celestial source of warmth and light illuminating the Tamil landscape.",
  },
  rain: {
    titleTa: "மழைத் துளிகள்",
    titleTr: "Mazhai Thuligal",
    titleEn: "Rainfall",
    desc: "Gentle summer rain nourishing the green fields, river, and flora.",
  },
  flower: {
    titleTa: "மலர்கள்",
    titleTr: "Malargal",
    titleEn: "Flowers",
    desc: "Fragrant blooming flowers dotting the lush green countryside.",
  },
};

export default function RhymeScene3D({
  onObjectSelect,
  selectedObjectId,
  activeActionObject,
}: RhymeScene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Scene Atmosphere & Control States
  const [timeOfDay, setTimeOfDay] = useState<"dawn" | "noon" | "night">("dawn");
  const [isRaining, setIsRaining] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [activeTabInfo, setActiveTabInfo] = useState<string | null>("elephant");

  // Audio Chime Feedback
  const playAudioFeedback = useCallback((objectId: string) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {}
  }, []);

  // Sync selected object prop
  useEffect(() => {
    if (selectedObjectId) {
      setActiveTabInfo(selectedObjectId);
    }
  }, [selectedObjectId]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 620;

    // ----------------------------------------------------------------- 1. SCENE & FOG
    const scene = new THREE.Scene();

    const getAtmosphereColors = (mode: "dawn" | "noon" | "night") => {
      if (mode === "dawn") {
        return {
          sky: "#0f172a",
          fog: "#1e1b4b",
          ambient: "#fde047",
          ambientIntensity: 0.85,
          sunColor: "#fbbf24",
          sunIntensity: 2.2,
          sunPos: [25, 22, 18],
        };
      } else if (mode === "noon") {
        return {
          sky: "#0284c7",
          fog: "#0369a1",
          ambient: "#ffffff",
          ambientIntensity: 1.15,
          sunColor: "#fef08a",
          sunIntensity: 2.8,
          sunPos: [10, 35, 10],
        };
      } else {
        // Night
        return {
          sky: "#030712",
          fog: "#0b0f19",
          ambient: "#38bdf8",
          ambientIntensity: 0.35,
          sunColor: "#818cf8",
          sunIntensity: 1.1,
          sunPos: [-20, 25, -15],
        };
      }
    };

    const initialAtmo = getAtmosphereColors(timeOfDay);
    scene.background = new THREE.Color(initialAtmo.sky);
    scene.fog = new THREE.FogExp2(initialAtmo.fog, 0.012);

    // ----------------------------------------------------------------- 2. CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    const defaultCamPos = new THREE.Vector3(0, 7.5, 22);
    camera.position.copy(defaultCamPos);
    camera.lookAt(0, 2.0, 0);
    cameraRef.current = camera;

    // ----------------------------------------------------------------- 3. RENDERER & TONEMAPPING
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = timeOfDay === "night" ? 0.9 : 1.25;
    container.appendChild(renderer.domElement);

    // ----------------------------------------------------------------- 4. ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 4;
    controls.maxDistance = 60;
    controls.target.set(0, 2.0, 0);
    controlsRef.current = controls;

    // ----------------------------------------------------------------- 5. LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight(initialAtmo.ambient, initialAtmo.ambientIntensity);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(initialAtmo.sunColor, initialAtmo.sunIntensity);
    sunLight.position.set(initialAtmo.sunPos[0], initialAtmo.sunPos[1], initialAtmo.sunPos[2]);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 90;
    sunLight.shadow.camera.left = -35;
    sunLight.shadow.camera.right = 35;
    sunLight.shadow.camera.top = 35;
    sunLight.shadow.camera.bottom = -35;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    const skyFill = new THREE.DirectionalLight("#38bdf8", 0.6);
    skyFill.position.set(-15, 18, -15);
    scene.add(skyFill);

    // Point lights for lanterns & lamps
    const houseLantern = new THREE.PointLight("#f59e0b", 2.2, 16);
    houseLantern.position.set(13, 3.2, -6);
    scene.add(houseLantern);

    const monumentTorch = new THREE.PointLight("#fbbf24", 2.5, 18);
    monumentTorch.position.set(-11, 4.0, -8);
    scene.add(monumentTorch);

    // ----------------------------------------------------------------- 6. INTERACTIVE REGISTRY
    const interactiveMeshes: THREE.Mesh[] = [];
    const registerInteractiveMesh = (mesh: THREE.Mesh, objectId: string) => {
      mesh.userData = { objectId };
      interactiveMeshes.push(mesh);
    };

    // ----------------------------------------------------------------- 7. VAST TERRAIN (100m x 100m)
    const terrainGeo = new THREE.PlaneGeometry(100, 100, 100, 100);
    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const dist = Math.sqrt(vx * vx + vy * vy);
      let zVal = Math.sin(vx * 0.15) * Math.cos(vy * 0.15) * 1.2;
      const riverTrench = Math.exp(-Math.pow(vy - Math.sin(vx * 0.1) * 3.5 - 2, 2) * 0.15);
      zVal -= riverTrench * 1.4;
      if (dist > 35) {
        zVal += (dist - 35) * 0.35 + Math.sin(vx * 0.3) * 2.0;
      }
      pos.setZ(i, zVal);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: "#059669",
      roughness: 0.8,
      metalness: 0.05,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    scene.add(terrain);

    // Stone Path
    const pathGeo = new THREE.PlaneGeometry(4, 32, 16, 16);
    const pathMat = new THREE.MeshStandardMaterial({ color: "#78716c", roughness: 0.9 });
    const villagePath = new THREE.Mesh(pathGeo, pathMat);
    villagePath.rotation.x = -Math.PI / 2;
    villagePath.rotation.z = Math.PI / 6;
    villagePath.position.set(6, 0.04, -2);
    villagePath.receiveShadow = true;
    scene.add(villagePath);

    // ----------------------------------------------------------------- 8. FLOWING RIVER & LOTUS FLOWERS & CORACLE BOAT
    const riverGeo = new THREE.PlaneGeometry(80, 10, 64, 16);
    const riverMat = new THREE.MeshStandardMaterial({
      color: "#0284c7",
      roughness: 0.05,
      metalness: 0.9,
      opacity: 0.88,
      transparent: true,
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.position.set(0, -0.65, 2);
    river.receiveShadow = true;
    registerInteractiveMesh(river, "river");
    scene.add(river);

    // Floating Lotus Flowers
    const createLotus = (x: number, z: number) => {
      const lotusGroup = new THREE.Group();
      lotusGroup.position.set(x, -0.58, z);

      const padGeo = new THREE.CircleGeometry(0.55, 16);
      const padMat = new THREE.MeshStandardMaterial({ color: "#15803d", roughness: 0.4 });
      const pad = new THREE.Mesh(padGeo, padMat);
      pad.rotation.x = -Math.PI / 2;
      lotusGroup.add(pad);

      const petalMat = new THREE.MeshStandardMaterial({ color: "#ec4899", roughness: 0.3 });
      for (let p = 0; p < 8; p++) {
        const petal = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.45, 8), petalMat);
        const angle = (p / 8) * Math.PI * 2;
        petal.position.set(Math.cos(angle) * 0.25, 0.15, Math.sin(angle) * 0.25);
        petal.rotation.z = Math.cos(angle) * 0.4;
        lotusGroup.add(petal);
      }
      registerInteractiveMesh(pad, "river");
      scene.add(lotusGroup);
      return lotusGroup;
    };

    const lotuses = [createLotus(-6, 2.5), createLotus(-2, 1.2), createLotus(4, 3.1), createLotus(10, 1.8)];

    // Coracle Boat (பரிசல்) on River
    const coracleGroup = new THREE.Group();
    coracleGroup.position.set(-8, -0.5, 3.5);
    const coracleGeo = new THREE.CylinderGeometry(1.2, 0.8, 0.5, 20);
    const coracleMat = new THREE.MeshStandardMaterial({ color: "#451a03", roughness: 0.9 });
    const coracle = new THREE.Mesh(coracleGeo, coracleMat);
    coracle.castShadow = true;
    registerInteractiveMesh(coracle, "boat");
    coracleGroup.add(coracle);
    scene.add(coracleGroup);

    // ----------------------------------------------------------------- 9. WOODEN ARCH BRIDGE
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(2, 0.1, 2);

    const bridgeArchGeo = new THREE.BoxGeometry(4.2, 0.25, 3.2);
    const woodMat = new THREE.MeshStandardMaterial({ color: "#78350f", roughness: 0.8 });
    const bridgeDeck = new THREE.Mesh(bridgeArchGeo, woodMat);
    bridgeDeck.position.y = 0.45;
    bridgeDeck.castShadow = true;
    bridgeDeck.receiveShadow = true;
    registerInteractiveMesh(bridgeDeck, "bridge");
    bridgeGroup.add(bridgeDeck);

    // Railings
    [-1.9, 0, 1.9].forEach((xPos) => {
      [-1.5, 1.5].forEach((zPos) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.1, 12), woodMat);
        post.position.set(xPos, 0.9, zPos);
        post.castShadow = true;
        bridgeGroup.add(post);
      });
    });
    scene.add(bridgeGroup);

    // ----------------------------------------------------------------- 10. SCULPTED ELEPHANT CHARACTER
    const elephantGroup = new THREE.Group();
    elephantGroup.position.set(0, 0, 0);

    const skinMat = new THREE.MeshStandardMaterial({ color: "#d97706", roughness: 0.45, metalness: 0.15 });
    const earInnerMat = new THREE.MeshStandardMaterial({ color: "#f59e0b", roughness: 0.5 });
    const tuskMat = new THREE.MeshStandardMaterial({ color: "#fef3c7", roughness: 0.2 });
    const eyeGlassMat = new THREE.MeshStandardMaterial({ color: "#09090b", roughness: 0.05, metalness: 0.9 });

    // Body
    const bodyGeo = new THREE.SphereGeometry(1.5, 32, 32);
    bodyGeo.scale(1.15, 0.98, 1.25);
    const body = new THREE.Mesh(bodyGeo, skinMat);
    body.position.y = 1.35;
    body.castShadow = true;
    body.receiveShadow = true;
    registerInteractiveMesh(body, "elephant");
    elephantGroup.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.98, 28, 28), skinMat);
    head.position.set(0, 2.38, 0.85);
    head.castShadow = true;
    registerInteractiveMesh(head, "elephant");
    elephantGroup.add(head);

    // Ears
    const earGeo = new THREE.CylinderGeometry(0.78, 0.78, 0.06, 24);
    earGeo.rotateX(Math.PI / 2);
    const earL = new THREE.Mesh(earGeo, earInnerMat);
    earL.position.set(-1.08, 2.48, 0.85);
    earL.rotation.y = Math.PI / 5;
    earL.castShadow = true;
    elephantGroup.add(earL);

    const earR = new THREE.Mesh(earGeo, earInnerMat);
    earR.position.set(1.08, 2.48, 0.85);
    earR.rotation.y = -Math.PI / 5;
    earR.castShadow = true;
    elephantGroup.add(earR);

    // Tusks
    const tuskGeo = new THREE.ConeGeometry(0.08, 0.68, 16);
    tuskGeo.rotateX(-Math.PI / 3);
    const tuskL = new THREE.Mesh(tuskGeo, tuskMat);
    tuskL.position.set(-0.35, 1.95, 1.6);
    tuskL.rotation.z = -Math.PI / 12;
    elephantGroup.add(tuskL);

    const tuskR = new THREE.Mesh(tuskGeo, tuskMat);
    tuskR.position.set(0.35, 1.95, 1.6);
    tuskR.rotation.z = Math.PI / 12;
    elephantGroup.add(tuskR);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeL = new THREE.Mesh(eyeGeo, eyeGlassMat);
    eyeL.position.set(-0.34, 2.58, 1.68);
    elephantGroup.add(eyeL);

    const eyeR = new THREE.Mesh(eyeGeo, eyeGlassMat);
    eyeR.position.set(0.34, 2.58, 1.68);
    elephantGroup.add(eyeR);

    // Trunk
    const trunkGroup = new THREE.Group();
    trunkGroup.position.set(0, 2.0, 1.7);
    for (let i = 0; i < 5; i++) {
      const radius = 0.18 - i * 0.025;
      const segGeo = new THREE.CylinderGeometry(radius, radius + 0.03, 0.25, 16);
      const seg = new THREE.Mesh(segGeo, skinMat);
      seg.position.set(0, -i * 0.2, i * 0.08);
      seg.rotation.x = Math.PI / 6 + i * 0.08;
      seg.castShadow = true;
      registerInteractiveMesh(seg, "elephant");
      trunkGroup.add(seg);
    }
    elephantGroup.add(trunkGroup);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.38, 0.42, 1.0, 20);
    [
      [-0.75, 0.5, 0.65],
      [0.75, 0.5, 0.65],
      [-0.75, 0.5, -0.65],
      [0.75, 0.5, -0.65],
    ].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, skinMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      elephantGroup.add(leg);
    });

    scene.add(elephantGroup);

    // ----------------------------------------------------------------- 11. UMBRELLA
    const umbrellaGroup = new THREE.Group();
    umbrellaGroup.position.set(0.0, 3.9, 0.45);

    const umbCapGeo = new THREE.ConeGeometry(1.8, 0.78, 32);
    const umbCapMat = new THREE.MeshStandardMaterial({ color: "#8b5cf6", roughness: 0.25 });
    const umbCap = new THREE.Mesh(umbCapGeo, umbCapMat);
    umbCap.castShadow = true;
    registerInteractiveMesh(umbCap, "umbrella");
    umbrellaGroup.add(umbCap);

    const umbPole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.4, 16), new THREE.MeshStandardMaterial({ color: "#cbd5e1" }));
    umbPole.position.y = -1.2;
    umbrellaGroup.add(umbPole);

    scene.add(umbrellaGroup);

    // ----------------------------------------------------------------- 12. VILLAGE HOUSES & CLAY POT
    const createVillageHouse = (x: number, z: number, rotationY = 0) => {
      const houseGroup = new THREE.Group();
      houseGroup.position.set(x, 0, z);
      houseGroup.rotation.y = rotationY;

      const wall = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.6, 4.2), new THREE.MeshStandardMaterial({ color: "#fef3c7", roughness: 0.8 }));
      wall.position.y = 1.3;
      wall.castShadow = true;
      wall.receiveShadow = true;
      registerInteractiveMesh(wall, "house");
      houseGroup.add(wall);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(3.8, 1.8, 4), new THREE.MeshStandardMaterial({ color: "#ea580c", roughness: 0.6 }));
      roof.rotateY(Math.PI / 4);
      roof.position.y = 3.4;
      roof.scale.set(1.1, 1.0, 0.9);
      roof.castShadow = true;
      registerInteractiveMesh(roof, "house");
      houseGroup.add(roof);

      // Terracotta Clay Pot (மண் பானை) at Threshold
      const potGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const potMat = new THREE.MeshStandardMaterial({ color: "#9a3412", roughness: 0.7 });
      const pot = new THREE.Mesh(potGeo, potMat);
      pot.position.set(-1.8, 0.45, 2.3);
      pot.castShadow = true;
      registerInteractiveMesh(pot, "pot");
      houseGroup.add(pot);

      scene.add(houseGroup);
      return houseGroup;
    };

    createVillageHouse(13, -7, -Math.PI / 6);

    // ----------------------------------------------------------------- 13. THATCHED HUT (குடில்)
    const hutGroup = new THREE.Group();
    hutGroup.position.set(-16, 0, -4);
    const hutWall = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 2.2, 16), new THREE.MeshStandardMaterial({ color: "#d97706", roughness: 0.9 }));
    hutWall.position.y = 1.1;
    hutWall.castShadow = true;
    registerInteractiveMesh(hutWall, "hut");
    hutGroup.add(hutWall);

    const hutRoof = new THREE.Mesh(new THREE.ConeGeometry(3.2, 1.8, 16), new THREE.MeshStandardMaterial({ color: "#b45309", roughness: 0.95 }));
    hutRoof.position.y = 3.0;
    hutRoof.castShadow = true;
    registerInteractiveMesh(hutRoof, "hut");
    hutGroup.add(hutRoof);
    scene.add(hutGroup);

    // ----------------------------------------------------------------- 14. TEMPLE GOPURAM (கோவில்) ON HILL
    const templeGroup = new THREE.Group();
    templeGroup.position.set(0, 5.0, -32);

    const gop1 = new THREE.Mesh(new THREE.BoxGeometry(7, 3, 5), new THREE.MeshStandardMaterial({ color: "#d97706" }));
    gop1.position.y = 1.5;
    registerInteractiveMesh(gop1, "temple");
    templeGroup.add(gop1);

    const gop2 = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.8, 3.8), new THREE.MeshStandardMaterial({ color: "#f59e0b" }));
    gop2.position.y = 4.4;
    registerInteractiveMesh(gop2, "temple");
    templeGroup.add(gop2);

    const kalasam = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.4, 16), new THREE.MeshStandardMaterial({ color: "#facc15", metalness: 0.8 }));
    kalasam.position.y = 6.5;
    templeGroup.add(kalasam);
    scene.add(templeGroup);

    // ----------------------------------------------------------------- 15. ANCIENT GRANITE MONUMENT & AGAL VILAKKU LAMP
    const monumentGroup = new THREE.Group();
    monumentGroup.position.set(-12, 0, -8);

    const graniteMat = new THREE.MeshStandardMaterial({ color: "#475569", roughness: 0.95 });
    const pillarBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 2.4), graniteMat);
    pillarBase.position.y = 0.4;
    pillarBase.castShadow = true;
    registerInteractiveMesh(pillarBase, "monument");
    monumentGroup.add(pillarBase);

    const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5.2, 1.6), graniteMat);
    pillar.position.y = 3.4;
    pillar.castShadow = true;
    registerInteractiveMesh(pillar, "monument");
    monumentGroup.add(pillar);

    // Agal Vilakku Lamp (அகல் விளக்கு) at base
    const lampGeo = new THREE.CylinderGeometry(0.3, 0.15, 0.2, 16);
    const lampMat = new THREE.MeshStandardMaterial({ color: "#d97706" });
    const lamp = new THREE.Mesh(lampGeo, lampMat);
    lamp.position.set(1.4, 0.9, 0);
    registerInteractiveMesh(lamp, "lamp");
    monumentGroup.add(lamp);

    scene.add(monumentGroup);

    // ----------------------------------------------------------------- 16. TAMIL FOLK PARAI DRUM (பறை / மேளம்)
    const drumGroup = new THREE.Group();
    drumGroup.position.set(8, 0, -3);

    const drumGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.9, 20);
    const drumMat = new THREE.MeshStandardMaterial({ color: "#b45309", roughness: 0.6 });
    const drum = new THREE.Mesh(drumGeo, drumMat);
    drum.rotation.z = Math.PI / 2;
    drum.position.y = 0.6;
    drum.castShadow = true;
    registerInteractiveMesh(drum, "drum");
    drumGroup.add(drum);
    scene.add(drumGroup);

    // ----------------------------------------------------------------- 17. PADDY CROP FIELD (நெற்பயிர்)
    const fieldGroup = new THREE.Group();
    fieldGroup.position.set(-14, 0, 8);

    const plotGeo = new THREE.BoxGeometry(8, 0.1, 6);
    const plotMat = new THREE.MeshStandardMaterial({ color: "#84cc16", roughness: 0.9 });
    const plot = new THREE.Mesh(plotGeo, plotMat);
    plot.position.y = 0.05;
    registerInteractiveMesh(plot, "field");
    fieldGroup.add(plot);
    scene.add(fieldGroup);

    // ----------------------------------------------------------------- 18. REGAL 3D PEACOCK (மயில்) ON GRANITE RIDGE
    const peacockGroup = new THREE.Group();
    peacockGroup.position.set(-10, 2.2, 5);

    // Granite Rock Perch
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1.8, 1), graniteMat);
    rock.position.y = -0.5;
    rock.castShadow = true;
    rock.receiveShadow = true;
    registerInteractiveMesh(rock, "peacock");
    peacockGroup.add(rock);

    // Peacock Materials
    const royalBlueMat = new THREE.MeshStandardMaterial({
      color: "#1d4ed8",
      roughness: 0.2,
      metalness: 0.6,
      emissive: "#0284c7",
      emissiveIntensity: 0.15,
    });
    const tealMat = new THREE.MeshStandardMaterial({
      color: "#0f766e",
      roughness: 0.3,
      metalness: 0.4,
    });
    const emeraldMat = new THREE.MeshStandardMaterial({
      color: "#059669",
      roughness: 0.35,
      metalness: 0.25,
      side: THREE.DoubleSide,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: "#f59e0b",
      roughness: 0.25,
      metalness: 0.7,
    });
    const darkNavyMat = new THREE.MeshStandardMaterial({
      color: "#0f172a",
      roughness: 0.2,
    });
    const whiteMat = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.5,
    });

    // Peacock Body
    const peaBodyGeo = new THREE.SphereGeometry(0.55, 24, 24);
    peaBodyGeo.scale(1.0, 1.3, 0.95);
    const peaBody = new THREE.Mesh(peaBodyGeo, royalBlueMat);
    peaBody.position.set(0, 0.75, 0.1);
    peaBody.castShadow = true;
    registerInteractiveMesh(peaBody, "peacock");
    peacockGroup.add(peaBody);

    // Curved S-Neck & Head Group
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, 1.2, 0.25);

    const neck1 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 0.6, 16), royalBlueMat);
    neck1.position.set(0, 0.3, 0.1);
    neck1.rotation.x = Math.PI / 12;
    registerInteractiveMesh(neck1, "peacock");
    neckGroup.add(neck1);

    const neck2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.55, 16), royalBlueMat);
    neck2.position.set(0, 0.75, 0.2);
    neck2.rotation.x = -Math.PI / 10;
    registerInteractiveMesh(neck2, "peacock");
    neckGroup.add(neck2);

    const headGeo = new THREE.SphereGeometry(0.24, 20, 20);
    headGeo.scale(1.1, 1.0, 1.2);
    const peaHead = new THREE.Mesh(headGeo, royalBlueMat);
    peaHead.position.set(0, 1.05, 0.12);
    peaHead.castShadow = true;
    registerInteractiveMesh(peaHead, "peacock");
    neckGroup.add(peaHead);

    // Eyes & Eye Patches
    [-0.15, 0.15].forEach((xEye) => {
      const eyePatch = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), whiteMat);
      eyePatch.position.set(xEye, 1.08, 0.22);
      neckGroup.add(eyePatch);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), darkNavyMat);
      pupil.position.set(xEye * 1.05, 1.08, 0.26);
      neckGroup.add(pupil);
    });

    // Beak
    const beakGeo = new THREE.ConeGeometry(0.09, 0.35, 12);
    const beak = new THREE.Mesh(beakGeo, goldMat);
    beak.position.set(0, 1.02, 0.38);
    beak.rotation.x = Math.PI / 2.3;
    registerInteractiveMesh(beak, "peacock");
    neckGroup.add(beak);

    // Crown Crest (Kondai Feathers)
    for (let c = -2; c <= 2; c++) {
      const crestStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.25, 8), goldMat);
      const angle = (c * Math.PI) / 24;
      crestStem.position.set(c * 0.04, 1.3, 0.08);
      crestStem.rotation.z = -angle;

      const crestTip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), royalBlueMat);
      crestTip.position.y = 0.14;
      crestStem.add(crestTip);
      registerInteractiveMesh(crestStem, "peacock");
      neckGroup.add(crestStem);
    }

    peacockGroup.add(neckGroup);

    // Wings
    [-0.45, 0.45].forEach((xSide) => {
      const wingGeo = new THREE.SphereGeometry(0.4, 16, 16);
      wingGeo.scale(0.3, 1.1, 0.7);
      const wing = new THREE.Mesh(wingGeo, tealMat);
      wing.position.set(xSide, 0.75, 0.05);
      wing.rotation.z = xSide > 0 ? -Math.PI / 10 : Math.PI / 10;
      wing.rotation.x = Math.PI / 12;
      wing.castShadow = true;
      registerInteractiveMesh(wing, "peacock");
      peacockGroup.add(wing);
    });

    // Legs
    [-0.22, 0.22].forEach((xLeg) => {
      const legMat = new THREE.MeshStandardMaterial({ color: "#d97706", roughness: 0.6 });
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.65, 12), legMat);
      leg.position.set(xLeg, 0.1, 0.05);
      leg.castShadow = true;
      registerInteractiveMesh(leg, "peacock");
      peacockGroup.add(leg);
    });

    // Peacock Fanned Tail Train (தோகை)
    const fanGroup = new THREE.Group();
    fanGroup.position.set(0, 1.0, -0.2);
    fanGroup.rotation.x = Math.PI / 10;

    const backFanGeo = new THREE.CircleGeometry(2.1, 32, 0, Math.PI);
    const backFan = new THREE.Mesh(backFanGeo, emeraldMat);
    backFan.position.z = -0.05;
    registerInteractiveMesh(backFan, "peacock");
    fanGroup.add(backFan);

    const totalFeathers = 18;
    for (let f = 0; f < totalFeathers; f++) {
      const featherAngle = (f / (totalFeathers - 1)) * Math.PI - Math.PI / 2;
      const length = 1.9 + Math.sin((f / totalFeathers) * Math.PI) * 0.35;

      const featherStem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, length, 8), tealMat);
      featherStem.position.set(0, length / 2, 0);
      featherStem.rotation.z = -featherAngle;

      const eyeOuter = new THREE.Mesh(new THREE.CircleGeometry(0.18, 16), goldMat);
      eyeOuter.position.set(
        Math.sin(featherAngle) * (length * 0.9),
        Math.cos(featherAngle) * (length * 0.9),
        0.02
      );

      const eyeMid = new THREE.Mesh(
        new THREE.CircleGeometry(0.12, 16),
        new THREE.MeshStandardMaterial({ color: "#06b6d4", roughness: 0.3, side: THREE.DoubleSide })
      );
      eyeMid.position.z = 0.01;
      eyeOuter.add(eyeMid);

      const eyeCore = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), royalBlueMat);
      eyeCore.position.z = 0.01;
      eyeOuter.add(eyeCore);

      registerInteractiveMesh(eyeOuter, "peacock");
      fanGroup.add(eyeOuter);
    }

    peacockGroup.add(fanGroup);
    scene.add(peacockGroup);

    // ----------------------------------------------------------------- 19. VILLAGE BULL (காளை)
    const bullGroup = new THREE.Group();
    bullGroup.position.set(6, 0, 6);

    const bullMat = new THREE.MeshStandardMaterial({ color: "#78350f", roughness: 0.7 });
    const bullBody = new THREE.Mesh(new THREE.SphereGeometry(0.85, 20, 20), bullMat);
    bullBody.scale.set(1.3, 0.9, 0.9);
    bullBody.position.y = 0.85;
    bullBody.castShadow = true;
    registerInteractiveMesh(bullBody, "bull");
    bullGroup.add(bullBody);
    scene.add(bullGroup);

    // ----------------------------------------------------------------- 20. PALMYRA & COCONUT PALM TREES & BANYAN TREE
    const createPalmyraTree = (x: number, z: number) => {
      const palmGroup = new THREE.Group();
      palmGroup.position.set(x, 0, z);

      const trunkMat = new THREE.MeshStandardMaterial({ color: "#451a03", roughness: 0.9 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.4, 7.5, 16), trunkMat);
      trunk.position.y = 3.75;
      trunk.castShadow = true;
      registerInteractiveMesh(trunk, "palm");
      palmGroup.add(trunk);

      const frondMat = new THREE.MeshStandardMaterial({ color: "#15803d", roughness: 0.4, side: THREE.DoubleSide });
      for (let f = 0; f < 8; f++) {
        const frond = new THREE.Mesh(new THREE.CircleGeometry(1.2, 12), frondMat);
        const angle = (f / 8) * Math.PI * 2;
        frond.position.set(Math.cos(angle) * 0.8, 7.5, Math.sin(angle) * 0.8);
        frond.rotation.x = Math.PI / 3;
        frond.rotation.y = angle;
        palmGroup.add(frond);
      }
      scene.add(palmGroup);
    };

    createPalmyraTree(-15, -2);

    // Coconut Tree (தென்னை மரம்)
    const createCoconutTree = (x: number, z: number) => {
      const cocoGroup = new THREE.Group();
      cocoGroup.position.set(x, 0, z);

      const trunkGeo = new THREE.CylinderGeometry(0.28, 0.45, 8.5, 16);
      const trunkMat = new THREE.MeshStandardMaterial({ color: "#522504", roughness: 0.8 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 4.25;
      trunk.rotation.z = -0.08;
      trunk.castShadow = true;
      registerInteractiveMesh(trunk, "coconut");
      cocoGroup.add(trunk);

      // Coconuts
      const nutMat = new THREE.MeshStandardMaterial({ color: "#16a34a" });
      for (let n = 0; n < 4; n++) {
        const nut = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), nutMat);
        const angle = (n / 4) * Math.PI * 2;
        nut.position.set(Math.cos(angle) * 0.35, 8.3, Math.sin(angle) * 0.35);
        cocoGroup.add(nut);
      }
      scene.add(cocoGroup);
    };

    createCoconutTree(16, 2);

    const createBanyanTree = (x: number, z: number) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0, z);

      const trunkMat = new THREE.MeshStandardMaterial({ color: "#3a1a08", roughness: 0.9 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.1, 4.5, 16), trunkMat);
      trunk.position.y = 2.25;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(3.2, 2), new THREE.MeshStandardMaterial({ color: "#047857", roughness: 0.5 }));
      crown.position.set(0, 5.5, 0);
      crown.castShadow = true;
      registerInteractiveMesh(crown, "banyan");
      treeGroup.add(crown);
      scene.add(treeGroup);
    };

    createBanyanTree(-8, -12);

    // ----------------------------------------------------------------- 21. CELESTIAL SUN
    const celestialGroup = new THREE.Group();
    celestialGroup.position.set(initialAtmo.sunPos[0], initialAtmo.sunPos[1], initialAtmo.sunPos[2]);
    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(2.2, 32, 32), new THREE.MeshBasicMaterial({ color: initialAtmo.sunColor }));
    registerInteractiveMesh(sunMesh, "sun");
    celestialGroup.add(sunMesh);
    scene.add(celestialGroup);

    // ----------------------------------------------------------------- 22. PARTICLES (RAIN & FIREFLIES)
    const rainCount = 350;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);
    for (let r = 0; r < rainCount; r++) {
      rainPos[r * 3] = (Math.random() - 0.5) * 50;
      rainPos[r * 3 + 1] = Math.random() * 25 + 2;
      rainPos[r * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPos, 3));
    const rainMat = new THREE.PointsMaterial({ color: "#38bdf8", size: 0.18, transparent: true, opacity: 0.75 });
    const rainParticles = new THREE.Points(rainGeo, rainMat);
    scene.add(rainParticles);

    // Fireflies
    const fireflyCount = 60;
    const fireflyGeo = new THREE.BufferGeometry();
    const fireflyPos = new Float32Array(fireflyCount * 3);
    for (let f = 0; f < fireflyCount; f++) {
      fireflyPos[f * 3] = (Math.random() - 0.5) * 40;
      fireflyPos[f * 3 + 1] = Math.random() * 6 + 0.5;
      fireflyPos[f * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    fireflyGeo.setAttribute("position", new THREE.BufferAttribute(fireflyPos, 3));
    const fireflyMat = new THREE.PointsMaterial({ color: "#facc15", size: 0.35, transparent: true, opacity: 0.85 });
    const fireflyParticles = new THREE.Points(fireflyGeo, fireflyMat);
    scene.add(fireflyParticles);

    // ----------------------------------------------------------------- 23. RAYCASTING & CLICK INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const objId = intersects[0].object.userData?.objectId;
        if (objId) {
          setHoveredObject(objId);
          renderer.domElement.style.cursor = "pointer";
          return;
        }
      }
      setHoveredObject(null);
      renderer.domElement.style.cursor = "default";
    };

    const handlePointerClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const objId = intersects[0].object.userData?.objectId;
        if (objId) {
          playAudioFeedback(objId);
          onObjectSelect(objId);
          setActiveTabInfo(objId);
        }
      }
    };

    renderer.domElement.addEventListener("mousemove", handlePointerMove);
    renderer.domElement.addEventListener("click", handlePointerClick);

    // ----------------------------------------------------------------- 24. ANIMATION LOOP
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      // Idle Elephant Breathing Animation
      elephantGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.05;
      trunkGroup.rotation.z = Math.sin(elapsedTime * 2.2) * 0.08;

      // Peacock Tail & Neck Dance Motion
      fanGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.05;
      neckGroup.rotation.y = Math.sin(elapsedTime * 2.0) * 0.08;

      // Lotus Water Drift
      lotuses.forEach((l, idx) => {
        l.position.y = -0.58 + Math.sin(elapsedTime * 1.5 + idx) * 0.03;
      });

      // Rain animation
      if (isRaining) {
        rainParticles.visible = true;
        const positions = rainGeo.attributes.position.array as Float32Array;
        for (let r = 0; r < rainCount; r++) {
          positions[r * 3 + 1] -= 0.42;
          if (positions[r * 3 + 1] < 0) {
            positions[r * 3 + 1] = 25;
          }
        }
        rainGeo.attributes.position.needsUpdate = true;
      } else {
        rainParticles.visible = false;
      }

      // Fireflies floating
      const ffPos = fireflyGeo.attributes.position.array as Float32Array;
      for (let f = 0; f < fireflyCount; f++) {
        ffPos[f * 3 + 1] += Math.sin(elapsedTime * 2 + f) * 0.01;
      }
      fireflyGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener("mousemove", handlePointerMove);
      renderer.domElement.removeEventListener("click", handlePointerClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [timeOfDay, isRaining, onObjectSelect, playAudioFeedback]);

  // Camera Fly Preset Handlers
  const flyCameraTo = (preset: string) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;

    if (preset === "world") {
      cam.position.set(0, 9.5, 25);
      ctrl.target.set(0, 2.0, 0);
    } else if (preset === "elephant") {
      cam.position.set(0, 3.8, 6.5);
      ctrl.target.set(0, 2.0, 0);
    } else if (preset === "village") {
      cam.position.set(15, 5.0, 4);
      ctrl.target.set(15, 2.0, -5);
    } else if (preset === "monument") {
      cam.position.set(-11, 4.2, -2);
      ctrl.target.set(-11, 3.5, -8);
    } else if (preset === "peacock") {
      cam.position.set(-10, 3.8, 9);
      ctrl.target.set(-10, 2.5, 5);
    } else if (preset === "temple") {
      cam.position.set(0, 8.0, -18);
      ctrl.target.set(0, 5.0, -32);
    } else if (preset === "field") {
      cam.position.set(-14, 4.0, 15);
      ctrl.target.set(-14, 0.5, 8);
    }
    ctrl.update();
  };

  const activeInfo = activeTabInfo ? WORLD_OBJECT_INFO[activeTabInfo] : null;

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border border-zinc-800/90 shadow-2xl bg-[#090e17] transition-all duration-300 ${
        isFullscreen ? "fixed inset-4 z-50 rounded-2xl h-[calc(100vh-2rem)]" : "h-[640px] w-full"
      }`}
    >
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Controls Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-20">
        {/* Atmosphere & Weather Controls */}
        <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-800/90 p-1.5 rounded-2xl backdrop-blur-md pointer-events-auto shadow-xl">
          <button
            onClick={() => setTimeOfDay("dawn")}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              timeOfDay === "dawn"
                ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sun size={14} /> Dawn
          </button>

          <button
            onClick={() => setTimeOfDay("noon")}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              timeOfDay === "noon"
                ? "bg-sky-500 text-zinc-950 shadow-md shadow-sky-500/20"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sparkles size={14} /> Noon
          </button>

          <button
            onClick={() => setTimeOfDay("night")}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              timeOfDay === "night"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Moon size={14} /> Night
          </button>

          <div className="h-4 w-px bg-zinc-800 mx-1" />

          <button
            onClick={() => setIsRaining(!isRaining)}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isRaining
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <CloudRain size={14} /> Rain {isRaining ? "ON" : "OFF"}
          </button>
        </div>

        {/* Viewport Control Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:text-white backdrop-blur-md transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen 3D Mode"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Camera Fly Presets Quick Bar (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-1.5 bg-zinc-950/80 border border-zinc-800/90 p-1.5 rounded-2xl backdrop-blur-md shadow-xl">
        <span className="text-[10px] font-mono text-zinc-400 px-2 flex items-center gap-1">
          <Camera size={12} className="text-amber-400" /> Focus:
        </span>
        <button
          onClick={() => flyCameraTo("world")}
          className="px-2.5 py-1 rounded-xl font-mono text-[11px] text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
        >
          🗺️ World
        </button>
        <button
          onClick={() => flyCameraTo("elephant")}
          className="px-2.5 py-1 rounded-xl font-mono text-[11px] text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
        >
          🐘 Elephant
        </button>
        <button
          onClick={() => flyCameraTo("village")}
          className="px-2.5 py-1 rounded-xl font-mono text-[11px] text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
        >
          🏠 Village
        </button>
        <button
          onClick={() => flyCameraTo("temple")}
          className="px-2.5 py-1 rounded-xl font-mono text-[11px] text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
        >
          🛕 Temple
        </button>
        <button
          onClick={() => flyCameraTo("monument")}
          className="px-2.5 py-1 rounded-xl font-mono text-[11px] text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
        >
          🏛️ Monument
        </button>
        <button
          onClick={() => flyCameraTo("peacock")}
          className="px-2.5 py-1 rounded-xl font-mono text-[11px] text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
        >
          🦚 Peacock
        </button>
      </div>

      {/* Interactive Object Inspector Card (Bottom Right) */}
      {activeInfo && (
        <div className="absolute bottom-4 right-4 z-20 max-w-sm bg-zinc-950/90 border border-amber-500/40 rounded-2xl p-4 backdrop-blur-xl shadow-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div>
              <h4 className="font-tamil text-lg font-bold text-amber-300 leading-tight">
                {activeInfo.titleTa}
              </h4>
              <p className="text-xs font-mono text-zinc-400">
                {activeInfo.titleTr} ({activeInfo.titleEn})
              </p>
            </div>
            <button
              onClick={() => setActiveTabInfo(null)}
              className="text-zinc-500 hover:text-zinc-300 text-xs font-mono p-1"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-zinc-300 font-light leading-relaxed">{activeInfo.desc}</p>

          {/* Pronunciation TTS Trigger Button */}
          <button
            onClick={() => speakTamil(activeInfo.titleTa)}
            className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Volume2 size={16} /> Listen Pronunciation ({activeInfo.titleTa})
          </button>
        </div>
      )}

      {/* Hover Object Indicator Badge */}
      {hoveredObject && WORLD_OBJECT_INFO[hoveredObject] && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-amber-500 text-zinc-950 px-4 py-1.5 rounded-full font-mono text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center gap-2 animate-bounce">
          <Sparkles size={14} /> Tap to Voice Out: {WORLD_OBJECT_INFO[hoveredObject].titleTa} (
          {WORLD_OBJECT_INFO[hoveredObject].titleEn})
        </div>
      )}
    </div>
  );
}
