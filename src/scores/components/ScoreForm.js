import {
	Avatar,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
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
	avatar: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		textAlign: 'center',
		margin: 'auto',
	},
	scoreboard: {
		display: 'inline-block',
		margin: theme.spacing(1),
	},
	scoreDiv: {
		flexGrow: 1,
		'& > *': {
			margin: theme.spacing(1),
		},
		display: 'inline-block',
	},
}));

const ScoreForm = ({
	update,
	url,
	scoreId,
	methodOnSave,
	message,
	initialState,
	duration,
}) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const history = useHistory();

	const [scoreState, setScoreState] = useState(initialState);

	// Will fetch the previous score values if rendered from UpdateScore
	useEffect(() => {
		if (update === true) {
			const fetchScores = async () => {
				try {
					const response = await fetch(`${url}/${scoreId}`);
					const responseData = await response.json();
					setScoreState(responseData);
				} catch (err) {
					console.log(err);
				}
			};
			fetchScores();
		}
		return;
	}, [update, url, scoreId]);

	const handleIncrement = (score) => {
		setScoreState((prevState) => ({
			...prevState,
			[score]: prevState[score] + 1,
		}));
	};

	const handleDecrement = (score) => {
		setScoreState((prevState) => ({
			...prevState,
			[score]: prevState[score] - 1,
		}));
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

	const handleAlertOpen = () => {
		setAlertOpen(true);
	};

	const handleAlertClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertOpen(false);
	};

	const lockScore = () => {
		setScoreState((prevState) => ({ ...prevState, isFinished: true }));
		handleAlertClose();
	};

	const handleSave = async () => {
		const date = new Date();
		let newUrl;

		if (update === true) {
			newUrl = `${url}/${scoreId}`;
		} else {
			newUrl = url;
		}

		try {
			const response = await fetch(newUrl, {
				method: methodOnSave,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					playerOneName: 'Captain America',
					playerTwoName: 'Lady Deadpool',
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
				duration={duration}
				message={message}
				onClose={handleToastClose}
			/>
			<Dialog
				variant='outlined'
				color='primary'
				open={alertOpen}
				onClose={handleAlertClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Lock Game?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to lock this game? (This cannot be undone!)
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAlertClose} startIcon={<CancelIcon />}>
						CANCEL
					</Button>
					<Button
						variant='outlined'
						color='secondary'
						onClick={lockScore}
						startIcon={<LockIcon />}
					>
						LOCK
					</Button>
				</DialogActions>
			</Dialog>
			<Grid container className={classes.root}>
				<Grid item className={classes.item}>
					<div>
						<Typography variant='h5'>Captain America</Typography>
						<Avatar
							alt='Captain America'
							src='https://www.pinclipart.com/picdir/middle/421-4215319_silhouette-captain-america-vector-clipart.png'
							className={classes.avatar}
						/>
						<Button
							size='large'
							className={classes.scoreboard}
							onClick={() => {
								handleDecrement('playerOneScore');
							}}
							value={scoreState.playerOneScore}
							disabled={scoreState.isFinished}
						>
							<RemoveIcon />
						</Button>

						<Typography variant='h5' className={classes.scoreboard}>
							{scoreState.playerOneScore}
						</Typography>
						<Button
							size='large'
							className={classes.scoreboard}
							onClick={() => {
								handleIncrement('playerOneScore');
							}}
							value={scoreState.playerOneScore}
							disabled={scoreState.isFinished}
						>
							<AddIcon />
						</Button>
					</div>
					<Divider />
					<div>
						<Typography variant='h5'>Lady Deadpool</Typography>
						<Avatar
							alt='Lady Deadpool'
							src='https://s-media-cache-ak0.pinimg.com/474x/8e/1e/df/8e1edf7df948afe2fa34233333b7a76f.jpg'
							className={classes.avatar}
						/>
						<Button
							size='large'
							className={classes.scoreboard}
							onClick={() => {
								handleDecrement('playerTwoScore');
							}}
							value={scoreState.playerTwoScore}
							disabled={scoreState.isFinished}
						>
							<RemoveIcon />
						</Button>
						<Typography variant='h5' className={classes.scoreboard}>
							{scoreState.playerTwoScore}
						</Typography>
						<Button
							size='large'
							className={classes.scoreboard}
							onClick={() => {
								handleIncrement('playerTwoScore');
							}}
							value={scoreState.playerTwoScore}
							disabled={scoreState.isFinished}
						>
							<AddIcon />
						</Button>
					</div>
					<Divider />
					<Button
						variant='contained'
						className={classes.button}
						onClick={handleSave}
						startIcon={<SaveIcon />}
					>
						{update ? 'UPDATE' : 'SAVE'}
					</Button>
					<Button
						variant='outlined'
						color='secondary'
						className={classes.button}
						onClick={() => {
							history.push('/history');
						}}
						startIcon={<CancelIcon />}
					>
						CANCEL
					</Button>
					<Button
						variant='outlined'
						className={classes.button}
						onClick={handleAlertOpen}
						startIcon={<LockIcon />}
					>
						Lock
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default ScoreForm;
