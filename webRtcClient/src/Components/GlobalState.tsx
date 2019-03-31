import React, { FC, ReactNode, useReducer } from "react";
import { FpsContext, SetFpsContext, SetFullscreenContext } from "../contexts";
import genericReducer, { GlobalState } from "../store/genericReducer";

export interface Props {
	dispatch: React.Dispatch<Partial<GlobalState>>
	children: ReactNode
}

const GlobalStateHandler: FC<Props> = (props) => {
	var framesToUpdateFpsCounter = 30

	const setFps = (fps: number): void => {
		framesToUpdateFpsCounter--;
		if (framesToUpdateFpsCounter === 0) {
			props.dispatch({ fps });
			framesToUpdateFpsCounter = 30;
		}
	}

	const setFullscreen = (fullscreen: boolean) : void => {
		props.dispatch({ fullscreen });
	}

	return ( // maybe only put Set* providers in this handler
		<SetFullscreenContext.Provider value={setFullscreen}>
			<SetFpsContext.Provider value={setFps}>
				{props.children}
			</SetFpsContext.Provider>
		</SetFullscreenContext.Provider>
	);
}

export default GlobalStateHandler;
