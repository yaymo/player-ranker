import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import Player from './Player';
import {movePlayer, fetchPlayersSuccess} from '../actions';
import {connect} from 'react-redux';

const style = {
	width: 400,
};
@DragDropContext(HTML5Backend)
export class Container extends React.Component {
	constructor(props) {
		super(props);
		this.movePlayer = this.movePlayer.bind(this);
	}

		movePlayer(dragIndex, hoverIndex) {
			const {players} = this.props;
			const dragPlayer = players[dragIndex];
			const newPlayers = update(players, {$splice:[
						[dragIndex, 1],
						[hoverIndex, 0, dragPlayer],
					]})
			this.props.movePlayer(newPlayers);
		}

	componentDidMount(){
		fetch('http://localhost:8080/players').then(res => {
			if(!res.ok) {
				return Promise.reject(res.statusText);
			}
			return res.json();
		}).then(players => {
			this.props.fetchPlayersSuccess(players);
		});
	}

	render() {
		const players = this.props.players;
		return (
			<div style={style}>
				{players.map((player, rank) => (
					<Player key={player._id}
						index={rank}
						id={player._id}
						text={player.name}
						movePlayer={this.movePlayer}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	players: state.players
});

export default connect(mapStateToProps, {movePlayer, fetchPlayersSuccess})(Container);