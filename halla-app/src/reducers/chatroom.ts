import * as R from "ramda";
import { handleActions } from "redux-actions";
import * as Actions from "../../halla-shared/src/Actions";

const initialState: any = {};

export default handleActions({
	[Actions.LOGIN_SUCCESS]: (state, action) => {
		return {};
	},
	[Actions.JOIN_ROOM_SUCCESS]: (state, action) => {
		return action.payload;
	},
	[Actions.DIRECT_CHAT_SUCCESS]: (state, action) => {
		return {...action.payload};
	},
	[Actions.SET_ROOM_USERS]: (state, action) => {
		if (state._id === action.payload.roomId) {
		state.users = action.payload.users;
		}
		return {...state};
	},
	[Actions.REMOVE_USER]: (state, action) => {
		if (state._id === action.payload.roomId) {
		state.users = R.reject(R.propEq("_id", action.payload.userId))(state.users);
		}
		return {...state};
	},
	[Actions.NEW_MESSAGE]: (state, action) => {
		if (state._id === action.payload.roomId) {
			state.messages = [...state.messages, {time: new Date(), ...action.payload.message}];
		}
		return {...state};
	},
	[Actions.NEW_DIRECT_MESSAGE]: (state, action) => {
		if (state.sender && state.recipient) {
			if (
				(state.sender._id === action.payload.sender && state.recipient._id === action.payload.recipient) ||
				(state.sender._id === action.payload.recipient && state.recipient._id === action.payload.sender)
			) {
				state.messages = [...state.messages, action.payload];
			}
		}
		return {...state};
	}
}, initialState);
