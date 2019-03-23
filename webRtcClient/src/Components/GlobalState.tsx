import React, { FC, ReactNode, useReducer } from "react";
import { FpsContext, SetFpsContext } from "../contexts";
import genericReducer, { GlobalState } from "../store/genericReducer";
import { setFpsActionCreator } from "../store/actions";

export interface Props {
	/* state: GlobalState, */
	dispatch: React.Dispatch<(state: GlobalState) => GlobalState>
	children: ReactNode
}

const GlobalStateHandler: FC<Props> = (props) => {
	var framesToUpdateFpsCounter = 30

	const setFps = (fps: number): void => {
		framesToUpdateFpsCounter--;
		if (framesToUpdateFpsCounter === 0) {
			props.dispatch(setFpsActionCreator(fps));
			framesToUpdateFpsCounter = 30;
		}
	}

	return ( // maybe only put Set* providers in this handler
		<SetFpsContext.Provider value={setFps}>
			{props.children}
		</SetFpsContext.Provider>
	);
}

export default GlobalStateHandler;
