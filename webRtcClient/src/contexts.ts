import { createContext } from "react";

export type SetFps = (fps: number) => void;

export const FpsContext = createContext<number>(0);
export const SetFpsContext = createContext<SetFps>(() => {});

export const FullscreenContext = createContext<boolean>(false);
export const SetFullscreenContext = createContext<(fullscreen: boolean) => void>(() => {});