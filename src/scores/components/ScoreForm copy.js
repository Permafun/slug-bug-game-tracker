import { Divider, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import ScoreCounter from './ScoreCounter';
import Toast from '../../shared/components/Toast';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		'& > *': {
			margin: theme.spacing(2),
		},
	},
	item: {
		textAlign: 'center',
		width: '100%',
	},
	button: {
		margin: theme.spacing(1),
	},
}));

const ScoreForm = ({ update, url, scoreId, method, message, initialState }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const history = useHistory();

	const [scoreState, setScoreState] = useState(initialState);

	// Will fetch the previous score values if rendered from UpdateScore
	// useEffect(() => {
	// 	if (update === true) {
	// 		const fetchScores = async () => {
	// 			try {
	// 				const response = await fetch(`${url}/${scoreId}`);
	// 				setScoreState(response.json());
	// 			} catch (err) {
	// 				console.log(err);
	// 			}
	// 		};
	// 		fetchScores();
	// 	}
	// 	return;
	// }, [update, url, scoreId]);

	const handleScoreIncrement = (value) => {
		setScoreState((prevState) => ({
			...prevState,
			[value]: prevState.value + 1,
		}));
	};

	const handleScoreDecrement = (e, name) => {
		console.log(`Name: ${name}`);
		setScoreState((prevState) => ({ ...prevState, [name]: [name] - 1 }));
	};

	const handleToastOpen = () => {
		setOpen(true);
	};

	const handleToastClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handleSave = async (event) => {
		event.preventDefault();
		const date = new Date();

		try {
			const response = await fetch(url, {
				method: method,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					playerOneName: scoreState.playerOneName,
					playerTwoName: scoreState.playerTwoName,
					playerOneScore: scoreState.playerOneScore,
					playerTwoScore: scoreState.playerTwoScore,
					date: date,
					isFinished: scoreState.isFinished,
				}),
			});

			if (response.ok) {
				handleToastOpen();
				setTimeout(() => history.push('/history'), 4000);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Toast
				open={open}
				duration={10000}
				message={message}
				onClose={handleToastClose}
			/>
			<Grid container className={classes.root}>
				<Grid item className={classes.item}>
					<ScoreCounter
						playerName={scoreState.playerOneName}
						onIncrease={handleScoreIncrement}
						onDecrease={handleScoreDecrement}
						value={scoreState.playerOneScore}
						name='playerOneScore'
						src='https://www.pinclipart.com/picdir/middle/421-4215319_silhouette-captain-america-vector-clipart.png'
					/>
					<Divider />
					<ScoreCounter
						playerName={scoreState.playerTwoName}
						onIncrease={handleScoreIncrement}
						onDecrease={handleScoreDecrement}
						value={scoreState.playerTwoScore}
						name='playerTwoScore'
						src='https://s-media-cache-ak0.pinimg.com/474x/8e/1e/df/8e1edf7df948afe2fa34233333b7a76f.jpg'
					/>
					<Divider />
					<Button
						variant='contained'
						className={classes.button}
						onClick={handleSave}
					>
						SAVE
					</Button>
					<Button
						variant='outlined'
						color='secondary'
						className={classes.button}
						onClick={() => {
							history.push('/history');
						}}
					>
						CANCEL
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default ScoreForm;
