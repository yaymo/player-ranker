import {MOVE_PLAYER} from './actions';
import {FETCH_PLAYERS_SUCCESS} from './actions';
import update from 'react/lib/update';

const initialState = {
	players: []
};

export default (state=initialState, action) => {
	if(action.type === MOVE_PLAYER) {
		console.log("reducer action", action);
		return { ...state, players: action.players }; 
	}
	else if(action.type === FETCH_PLAYERS_SUCCESS) {
		console.log("players", action.players);
		let rankedPlayers = action.players.sort(function(playerA, playerB) {
			return playerA.rank - playerB.rank;
		});
		console.log("ranked players", rankedPlayers);
		return { ...state, players: rankedPlayers };
	}
	return state;
};