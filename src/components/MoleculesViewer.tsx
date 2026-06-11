import React, { useRef, useState, useEffect } from 'react';
import { MoleculeModel } from '../types';

interface MoleculesViewerProps {
  molecule: MoleculeModel;
}

export default function MoleculesViewer({ molecule }: MoleculesViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angles, setAngles] = useState({ x: 0.4, y: 0.5, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const angleStart = useRef({ x: 0, y: 0 });

  // Update canvas when angles or molecules change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and scale for high DPI screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw grid guide pattern (Apple style)
    ctx.strokeStyle = 'rgba(229, 229, 234, 0.4)';
    ctx.lineWidth = 0.5;
    for (let i = 20; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 20; i < height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // 3D Rotation Math
    const cosX = Math.cos(angles.x);
    const sinX = Math.sin(angles.x);
    const cosY = Math.cos(angles.y);
    const sinY = Math.sin(angles.y);
    const cosZ = Math.cos(angles.z);
    const sinZ = Math.sin(angles.z);

    // Rotate atoms
    const rotatedAtoms = molecule.atoms.map((atom) => {
      // Rotate Y
      let x1 = atom.x * cosY - atom.y * sinY;
      let y1 = atom.y * cosY + atom.x * sinY;
      let z1 = 0; // initially flat on Z-plane

      // Rotate X
      let y2 = y1 * cosX - z1 * sinX;
      let z2 = z1 * cosX + y1 * sinX;

      // Rotate Z
      let x3 = x1 * cosZ - y2 * sinZ;
      let y3 = y2 * cosZ + x1 * sinZ;

      return {
        ...atom,
        rx: x3,
        ry: y3,
        rz: z2 // depth variable for sorting overlaps
      };
    });

    // Draw Bonds (Behind & In front)
    ctx.lineCap = 'round';
    molecule.bonds.forEach((bond) => {
      const atomA = rotatedAtoms[bond.from];
      const atomB = rotatedAtoms[bond.to];

      const startX = centerX + atomA.rx;
      const startY = centerY + atomA.ry;
      const endX = centerX + atomB.rx;
      const endY = centerY + atomB.ry;

      // Draw custom bond tube
      ctx.strokeStyle = '#D1D5DB';
      if (bond.double) {
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      } else if (bond.triple) {
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        ctx.strokeStyle = '#E5E5EA';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      } else {
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    });

    // Sort Atoms by Depth (RZ) so spheres render correctly over each other
    const sortedAtoms = [...rotatedAtoms].sort((a, b) => a.rz - b.rz);

    // Draw Atoms with 3D gradient lighting spheres
    sortedAtoms.forEach((atom) => {
      const x = centerX + atom.rx;
      const y = centerY + atom.ry;

      ctx.beginPath();
      ctx.arc(x, y, atom.size / 2, 0, Math.PI * 2);

      // Create standard glossy gradient
      const grad = ctx.createRadialGradient(
        x - atom.size / 5,
        y - atom.size / 5,
        atom.size / 10,
        x,
        y,
        atom.size / 2
      );
      grad.addColorStop(0, '#FFFFFF'); // highlight reflection
      grad.addColorStop(0.2, atom.color);
      grad.addColorStop(1, adjustColorBrightness(atom.color, -50)); // dark shading boundary

      ctx.fillStyle = grad;
      ctx.fill();

      // Write element labels inside the spheres
      ctx.fillStyle = atom.color === '#D1D5DB' ? '#111827' : '#FFFFFF';
      ctx.font = `bold ${atom.size / 2.3}px var(--font-sans)`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(atom.type, x, y);
    });

  }, [molecule, angles]);

  // Gentle auto-rotation loop when resting
  useEffect(() => {
    if (isDragging) return;
    let animId: number;

    const tick = () => {
      setAngles((prev) => ({
        ...prev,
        y: prev.y + 0.005,
        x: prev.x + 0.002
      }));
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isDragging]);

  // Adjust color utility for dark shading edges
  const adjustColorBrightness = (hex: string, percent: number) => {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = Math.max(0, Math.min(255, R + percent));
    G = Math.max(0, Math.min(255, G + percent));
    B = Math.max(0, Math.min(255, B + percent));

    const rHex = R.toString(16).padStart(2, '0');
    const gHex = G.toString(16).padStart(2, '0');
    const bHex = B.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  };

  // Drag interaction events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    angleStart.current = { x: angles.x, y: angles.y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    setAngles({
      x: angleStart.current.x + dy * 0.01,
      y: angleStart.current.y + dx * 0.01,
      z: 0
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch screen support
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    angleStart.current = { x: angles.x, y: angles.y };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || e.touches.length === 0) return;
    const dx = e.touches[0].clientX - dragStart.current.x;
    const dy = e.touches[0].clientY - dragStart.current.y;

    setAngles({
      x: angleStart.current.x + dy * 0.01,
      y: angleStart.current.y + dx * 0.01,
      z: 0
    });
  };

  return (
    <div className="relative w-full aspect-square md:aspect-auto md:h-80 select-none">
      <canvas
        ref={canvasRef}
        id={`molecular-canvas-${molecule.name.replace(/\s+/g, '-').toLowerCase()}`}
        className="w-full h-full cursor-grab active:cursor-grabbing hover:scale-[1.01] transition-transform duration-300 rounded-2xl bg-white/40 border border-apple-gray-100"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
      />
      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-sm border border-apple-gray-200 text-[10px] font-mono text-gray-400 pointer-events-none">
        {molecule.name}
      </div>
    </div>
  );
}
