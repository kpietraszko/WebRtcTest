import { GlobalState } from './genericReducer';

export const setFpsActionCreator = (fps: number) => (state: GlobalState): GlobalState => {
	return { ...state, fps };
}