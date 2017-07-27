export const MOVE_PLAYER = 'move_player';
export const movePlayer = (players) => ({
	type: MOVE_PLAYER,
	players
});

export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const fetchPlayersSuccess = players => ({
	type: FETCH_PLAYERS_SUCCESS,
	players
});