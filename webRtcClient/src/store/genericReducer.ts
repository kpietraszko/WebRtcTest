import { GlobalState } from './genericReducer';

export interface GlobalState {
	fps: number,
	fullscreen: boolean	
}

export default (state: GlobalState, action: Partial<GlobalState>) : GlobalState => {
	preAction(action);
	var newState = Object.assign({...state}, action);
	postAction();
	return newState;
}

const preAction = (action: Partial<GlobalState>) => { /* console.log(`Dispatching action`, action) */ } // dummy
const postAction = () => { } // dummy