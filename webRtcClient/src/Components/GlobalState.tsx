import React, { FC, ReactNode, useReducer } from "react";
import { FpsContext } from "../contexts";
import genericReducer from "../store/genericReducer";
import { setFpsActionCreator } from "../store/actions";

export interface Props {
	children : ReactNode
}

const GlobalStateHandler : FC<Props> = (props) => {

	
	const [state, dispatch] = useReducer(genericReducer, { fps: 0 });
	
	const setFps = (fps: number): void => {
		dispatch(setFpsActionCreator(fps));
	}

	return (
		<FpsContext.Provider value={{fps: state.fps, setFps: setFps}}>
			{props.children}
		</FpsContext.Provider>
	);
}

export default GlobalStateHandler;
