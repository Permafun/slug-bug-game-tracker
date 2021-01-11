import { makeStyles } from '@material-ui/core';
import React from 'react';

import ScoreItem from './ScoreItem';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 400,
	},
	cardActions: {
		justifyContent: 'center',
	},
	list: {
		listStyle: 'none',
		margin: '1rem auto',
		padding: 0,
		width: '90%',
	},
	item: {
		margin: theme.spacing(0.5),
	},
	container: {
		display: 'inline-block',
	},
	cardTextA: {
		float: 'left',
	},
	cardTextB: {
		float: 'right',
	},
	cardTextC: {
		textAlign: 'center',
	},
}));

const ScoreList = (props) => {
	const classes = useStyles();

	return (
		<ul className={classes.list}>
			{props.items.map((score) => (
				<ScoreItem
					key={score.id}
					id={score.id}
					date={score.date}
					playerOneName={score.playerOneName}
					playerOneScore={score.playerOneScore}
					playerTwoName={score.playerTwoName}
					playerTwoScore={score.playerTwoScore}
					isFinished={score.isFinished}
					onDelete={props.onDeleteScore}
				/>
			))}
		</ul>
	);
};

export default ScoreList;
