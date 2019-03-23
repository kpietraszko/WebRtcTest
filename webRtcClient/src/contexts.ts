import { PerformanceMonitor } from 'babylonjs';
import { createContext } from "react";

export interface Fps {
	fps: number
	setFps: (fps: number) => void
}
export const FpsContext = createContext<Fps>({ fps: 0, setFps: () => {} });