import * as THREE from "three";

const FRAME_WIDTH = 0.12;
const BAR_THICKNESS = 0.04;
const GATE_WIDTH = 1.8;
const GATE_HEIGHT = 1.2;

function Frame({ color, metalness, roughness }) {
  return (
    <group>
      <mesh position={[0, GATE_HEIGHT / 2 + FRAME_WIDTH / 2, 0]}>
        <boxGeometry args={[GATE_WIDTH + FRAME_WIDTH * 2, FRAME_WIDTH, FRAME_WIDTH]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0, -GATE_HEIGHT / 2 - FRAME_WIDTH / 2, 0]}>
        <boxGeometry args={[GATE_WIDTH + FRAME_WIDTH * 2, FRAME_WIDTH, FRAME_WIDTH]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[-GATE_WIDTH / 2 - FRAME_WIDTH / 2, 0, 0]}>
        <boxGeometry args={[FRAME_WIDTH, GATE_HEIGHT + FRAME_WIDTH * 2, FRAME_WIDTH]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[GATE_WIDTH / 2 + FRAME_WIDTH / 2, 0, 0]}>
        <boxGeometry args={[FRAME_WIDTH, GATE_HEIGHT + FRAME_WIDTH * 2, FRAME_WIDTH]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
    </group>
  );
}

function VerticalBars({ color, metalness, roughness }) {
  const barCount = 8;
  const spacing = GATE_WIDTH / (barCount + 1);

  return (
    <group>
      {Array.from({ length: barCount }).map((_, i) => {
        const x = -GATE_WIDTH / 2 + spacing * (i + 1);
        return (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[BAR_THICKNESS, GATE_HEIGHT, BAR_THICKNESS * 0.8]} />
            <meshStandardMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function HorizontalBars({ color, metalness, roughness }) {
  const barCount = 6;
  const spacing = GATE_HEIGHT / (barCount + 1);

  return (
    <group>
      {Array.from({ length: barCount }).map((_, i) => {
        const y = -GATE_HEIGHT / 2 + spacing * (i + 1);
        return (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[GATE_WIDTH, BAR_THICKNESS, BAR_THICKNESS * 0.8]} />
            <meshStandardMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function GridBars({ color, metalness, roughness }) {
  const vCount = 6;
  const hCount = 5;
  const vSpacing = GATE_WIDTH / (vCount + 1);
  const hSpacing = GATE_HEIGHT / (hCount + 1);

  return (
    <group>
      {Array.from({ length: vCount }).map((_, i) => {
        const x = -GATE_WIDTH / 2 + vSpacing * (i + 1);
        return (
          <mesh key={`v-${i}`} position={[x, 0, 0]}>
            <boxGeometry args={[BAR_THICKNESS, GATE_HEIGHT, BAR_THICKNESS * 0.8]} />
            <meshStandardMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
            />
          </mesh>
        );
      })}
      {Array.from({ length: hCount }).map((_, i) => {
        const y = -GATE_HEIGHT / 2 + hSpacing * (i + 1);
        return (
          <mesh key={`h-${i}`} position={[0, y, 0]}>
            <boxGeometry args={[GATE_WIDTH, BAR_THICKNESS, BAR_THICKNESS * 0.8]} />
            <meshStandardMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function DiagonalBars({ color, metalness, roughness }) {
  const barCount = 7;
  const angle = Math.atan2(GATE_HEIGHT, GATE_WIDTH);
  const diagonalLength = Math.sqrt(GATE_WIDTH ** 2 + GATE_HEIGHT ** 2);

  return (
    <group>
      {Array.from({ length: barCount }).map((_, i) => {
        const t = (i + 1) / (barCount + 1);
        const x = -GATE_WIDTH / 2 + GATE_WIDTH * t;
        const y = -GATE_HEIGHT / 2 + GATE_HEIGHT * t;
        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, -angle]}>
            <boxGeometry args={[diagonalLength, BAR_THICKNESS, BAR_THICKNESS * 0.8]} />
            <meshStandardMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
            />
          </mesh>
        );
      })}
      {Array.from({ length: barCount }).map((_, i) => {
        const t = (i + 1) / (barCount + 1);
        const x = GATE_WIDTH / 2 - GATE_WIDTH * t;
        const y = -GATE_HEIGHT / 2 + GATE_HEIGHT * t;
        return (
          <mesh key={`b-${i}`} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[diagonalLength, BAR_THICKNESS, BAR_THICKNESS * 0.8]} />
            <meshStandardMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function MinimalBars({ color, metalness, roughness }) {
  const barCount = 4;
  const spacing = GATE_WIDTH / (barCount + 1);

  return (
    <group>
      {Array.from({ length: barCount }).map((_, i) => {
        const x = -GATE_WIDTH / 2 + spacing * (i + 1);
        return (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[BAR_THICKNESS * 1.5, GATE_HEIGHT, BAR_THICKNESS]} />
            <meshStandardMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Gate3D({ color, metalness, roughness, design }) {
  const Bars = {
    vertical: VerticalBars,
    horizontal: HorizontalBars,
    grid: GridBars,
    diagonal: DiagonalBars,
    minimal: MinimalBars,
  }[design] || VerticalBars;

  return (
    <group>
      <Frame color={color} metalness={metalness} roughness={roughness} />
      <Bars color={color} metalness={metalness} roughness={roughness} />
    </group>
  );
}
