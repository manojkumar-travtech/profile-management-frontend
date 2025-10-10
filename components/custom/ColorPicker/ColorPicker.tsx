"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value = "#ff0000",
  onChange,
  placeholder = "Select color...",
  readonly = false,
  disabled = false,
}) => {
  const [color, setColor] = useState(value);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<"hue" | "sl" | null>(null);
  const [dropdownInput, setDropdownInput] = useState(value);

  const hueRef = useRef<HTMLDivElement>(null);
  const slRef = useRef<HTMLDivElement>(null);

  const colorNames: { [key: string]: string } = {
    red: "#ff0000",
    green: "#008000",
    blue: "#0000ff",
    yellow: "#ffff00",
    orange: "#ffa500",
    purple: "#800080",
    pink: "#ffc0cb",
    black: "#000000",
    white: "#ffffff",
    gray: "#808080",
    cyan: "#00ffff",
    magenta: "#ff00ff",
    lime: "#00ff00",
    navy: "#000080",
    maroon: "#800000",
    olive: "#808000",
    teal: "#008080",
    silver: "#c0c0c0",
    gold: "#ffd700",
  };

  const colorNameToHex = useCallback(
    (name: string) => colorNames[name.toLowerCase().trim()] || null,
    []
  );

  const hexToHsl = useCallback((hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h * 360, s * 100, l * 100];
  }, []);

  const hslToHex = useCallback((h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    let r, g, b;
    if (s === 0) r = g = b = l;
    else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }, []);

  const parseColorInput = useCallback(
    (input: string): string | null => {
      if (!input) return null;
      let clean = input.trim();
      if (!clean.startsWith("#")) clean = "#" + clean;
      if (/^#[0-9A-Fa-f]{3}$/.test(clean)) {
        const [r, g, b] = [clean[1], clean[2], clean[3]];
        return `#${r}${r}${g}${g}${b}${b}`;
      }
      if (/^#[0-9A-Fa-f]{6}$/.test(clean)) return clean;
      const hexFromName = colorNameToHex(input);
      if (hexFromName) return hexFromName;
      return null;
    },
    [colorNameToHex]
  );

  // Initialize HSL based on initial value
  useEffect(() => {
    const parsed = parseColorInput(value);
    if (parsed) {
      const [h, s, l] = hexToHsl(parsed);
      setHue(h);
      setSaturation(s);
      setLightness(l);
      setColor(parsed);
      setDropdownInput(parsed);
    }
  }, []); // Run only once on mount

  // Sync with external value changes
  useEffect(() => {
    const parsed = parseColorInput(value);
    if (parsed && parsed !== color) {
      setColor(parsed);
      setDropdownInput(parsed);
      const [h, s, l] = hexToHsl(parsed);
      setHue(h);
      setSaturation(s);
      setLightness(l);
    }
  }, [value, color, hexToHsl, parseColorInput]);

  // Update color when HSL changes (from user interaction)
  useEffect(() => {
    const newHex = hslToHex(hue, saturation, lightness);
    if (newHex !== color) {
      setColor(newHex);
      setDropdownInput(newHex);
      onChange?.(newHex);
    }
  }, [hue, saturation, lightness, hslToHex, onChange]);

  const handleHueMouseDown = (e: React.MouseEvent) => {
    if (readonly || disabled) return;
    setIsDragging(true);
    setDragType("hue");
    updateHue(e);
  };

  const handleSLMouseDown = (e: React.MouseEvent) => {
    if (readonly || disabled) return;
    setIsDragging(true);
    setDragType("sl");
    updateSaturationLightness(e);
  };

  const updateHue = (e: React.MouseEvent | MouseEvent) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setHue((x / rect.width) * 360);
  };

  const updateSaturationLightness = (e: React.MouseEvent | MouseEvent) => {
    if (!slRef.current) return;
    const rect = slRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    setSaturation((x / rect.width) * 100);
    setLightness(100 - (y / rect.height) * 100);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      dragType === "hue" ? updateHue(e) : updateSaturationLightness(e);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      setDragType(null);
    };
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragType]);

  const handleDirectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readonly || disabled) return;
    const val = e.target.value;
    setDropdownInput(val);
    const parsed = parseColorInput(val);
    if (parsed) {
      setColor(parsed);
      const [h, s, l] = hexToHsl(parsed);
      setHue(h);
      setSaturation(s);
      setLightness(l);
      onChange?.(parsed);
    }
  };

  const handleInputBlur = () => {
    const parsed = parseColorInput(dropdownInput);
    if (!parsed) {
      // Reset to current color if input is invalid
      setDropdownInput(color);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <input
            type="text"
            value={color}
            readOnly
            placeholder={placeholder}
            disabled={disabled}
            className={`w-64 px-3 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer ${
              disabled ? "bg-gray-100 border-gray-200 cursor-not-allowed" : "bg-white border-gray-300"
            }`}
          />
          {/* <div 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 border border-gray-300 rounded"
            style={{ backgroundColor: color }}
          /> */}
        </div>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="start" className="w-64 p-4">
        <div
          ref={slRef}
          className="w-full h-48 mb-4 relative cursor-crosshair border border-gray-300 rounded"
          style={{
            background: `
              linear-gradient(to top, black, transparent),
              linear-gradient(to right, white, hsl(${hue}, 100%, 50%))
            `,
          }}
          onMouseDown={handleSLMouseDown}
        >
          <div
            className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md pointer-events-none transform -translate-x-2 -translate-y-2"
            style={{
              left: `${saturation}%`,
              top: `${100 - lightness}%`,
              backgroundColor: color,
            }}
          />
        </div>

        <div
          ref={hueRef}
          className="w-full h-6 mb-4 relative cursor-pointer border border-gray-300 rounded"
          style={{
            background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          }}
          onMouseDown={handleHueMouseDown}
        >
          <div
            className="absolute w-2 h-8 bg-white border border-gray-400 rounded shadow-md pointer-events-none transform -translate-x-1 -translate-y-1"
            style={{ left: `${(hue / 360) * 100}%` }}
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1">
            Enter color (hex or name):
          </label>
          <input
            type="text"
            value={dropdownInput}
            onChange={handleDirectInput}
            onBlur={handleInputBlur}
            placeholder="e.g. #fff, #ff0000, red"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;