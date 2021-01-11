import React from 'react';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import Button from '../../shared/components/FormElements/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	scoreboard: {
		display: 'inline-block',
	},
	item: {
		textAlign: 'center',
		width: '100%',
	},
	avatar: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		textAlign: 'center',
		margin: 'auto',
	},
}));

export default function ScoreCounter({
	playerName,
	src,
	onDecrease,
	onIncrease,
	value,
}) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant='h5'>{playerName}</Typography>
			<Avatar alt={playerName} src={src} className={classes.avatar} />
			<Button
				size='large'
				className={classes.scoreboard}
				onClick={() => onDecrease(playerName)}
				value={value}
			>
				-
			</Button>
			<Typography variant='h5' className={classes.scoreboard}>
				{value}
			</Typography>
			<Button
				size='large'
				className={classes.scoreboard}
				onClick={() => onIncrease(playerName)}
				value={value}
			>
				+
			</Button>
		</div>
	);
}
