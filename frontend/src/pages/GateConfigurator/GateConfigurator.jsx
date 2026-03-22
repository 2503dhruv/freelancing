import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Gate3D from "./Gate3D";
import "./GateConfigurator.css";

const COLORS = [
  { name: "Black", value: "#1a1a1a" },
  { name: "White", value: "#f5f5f5" },
  { name: "Charcoal", value: "#36454f" },
  { name: "Bronze", value: "#cd7f32" },
  { name: "Silver", value: "#c0c0c0" },
  { name: "Champagne", value: "#f7e7ce" },
  { name: "Forest Green", value: "#228b22" },
];

const FINISHES = [
  { id: "matte", name: "Matte", metalness: 0.3, roughness: 0.85 },
  { id: "brushed", name: "Brushed Steel", metalness: 0.7, roughness: 0.5 },
  { id: "polished", name: "Polished Chrome", metalness: 0.95, roughness: 0.1 },
  { id: "powder", name: "Powder Coated", metalness: 0.4, roughness: 0.6 },
];

const DESIGNS = [
  { id: "vertical", name: "Vertical Bars" },
  { id: "horizontal", name: "Horizontal Bars" },
  { id: "grid", name: "Grid" },
  { id: "diagonal", name: "Diagonal" },
  { id: "minimal", name: "Minimal (Wide Spacing)" },
];

export default function GateConfigurator() {
  const [color, setColor] = useState(COLORS[0]);
  const [finish, setFinish] = useState(FINISHES[1]);
  const [design, setDesign] = useState(DESIGNS[0]);
  const [customColor, setCustomColor] = useState("#1a1a1a");

  const activeColor = color.value === "custom" ? customColor : color.value;

  return (
    <div className="gate-configurator">
      <div className="gate-configurator__header">
        <h1 className="gate-configurator__title">Design Your Gate</h1>
        <p className="gate-configurator__subtitle">
          Choose your style, color, and finish. Drag to rotate the 3D view.
        </p>
      </div>

      <div className="gate-configurator__layout">
        <div className="gate-configurator__viewer">
          <Suspense
            fallback={
              <div className="gate-configurator__loading">Loading 3D...</div>
            }
          >
            <Canvas
              camera={{ position: [0, 0, 4], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <directionalLight position={[-3, 2, -2]} intensity={0.4} />
              <pointLight position={[0, 3, 2]} intensity={0.8} />
              <Gate3D
                color={activeColor}
                metalness={finish.metalness}
                roughness={finish.roughness}
                design={design.id}
              />
              <OrbitControls
                enablePan={false}
                minDistance={2}
                maxDistance={8}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </Suspense>
        </div>

        <aside className="gate-configurator__controls">
          <section className="gate-config__section">
            <h3 className="gate-config__label">Design</h3>
            <div className="gate-config__options">
              {DESIGNS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`gate-config__btn ${
                    design.id === d.id ? "gate-config__btn--active" : ""
                  }`}
                  onClick={() => setDesign(d)}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </section>

          <section className="gate-config__section">
            <h3 className="gate-config__label">Color</h3>
            <div className="gate-config__color-grid">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`gate-config__color-swatch ${
                    color.value === c.value ? "gate-config__color-swatch--active" : ""
                  }`}
                  style={{ background: c.value }}
                  onClick={() => setColor(c)}
                  title={c.name}
                  aria-label={`Select ${c.name}`}
                />
              ))}
            </div>
            <div className="gate-config__custom">
              <label htmlFor="custom-color">Custom:</label>
              <input
                id="custom-color"
                type="color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setColor({ name: "Custom", value: "custom" });
                }}
              />
            </div>
          </section>

          <section className="gate-config__section">
            <h3 className="gate-config__label">Finish / Texture</h3>
            <div className="gate-config__options gate-config__options--stacked">
              {FINISHES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`gate-config__btn gate-config__btn--full ${
                    finish.id === f.id ? "gate-config__btn--active" : ""
                  }`}
                  onClick={() => setFinish(f)}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </section>

          <div className="gate-configurator__cta">
            <button type="button" className="gate-configurator__submit">
              Get Quote
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
