import { useEffect, useState } from 'react';
import { Density, Mode, applyDensity, applyMode } from '@cloudscape-design/global-styles';

const STORAGE_KEY = 'portfolio-preview:settings';

interface Settings {
  density: Density;
  mode: Mode;
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Settings;
  } catch {
    // ignore malformed storage
  }
  return { density: Density.Comfortable, mode: Mode.Light };
}

// Call once at startup, outside React render, so the correct theme/density applies before first paint.
export function applyStoredSettings() {
  const settings = loadSettings();
  applyDensity(settings.density);
  applyMode(settings.mode);
}

export function useDisplaySettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    applyDensity(settings.density);
    applyMode(settings.mode);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  return {
    density: settings.density,
    mode: settings.mode,
    setDensity: (density: Density) => setSettings((s) => ({ ...s, density })),
    setMode: (mode: Mode) => setSettings((s) => ({ ...s, mode })),
  };
}
