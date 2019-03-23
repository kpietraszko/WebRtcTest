import { GlobalState } from './genericReducer';

export interface GlobalState {
	fps: number
}

export default (state: GlobalState, action: (state: GlobalState) => GlobalState) : GlobalState => {
	preAction();
	var newState = action(state)
	postAction();
	return newState;
}

const preAction = () => { } // dummy
const postAction = () => { } // dummy