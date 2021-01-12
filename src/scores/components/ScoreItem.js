import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CancelIcon from '@material-ui/icons/Cancel';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Toast from '../../shared/components/Toast';

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

const ScoreItem = ({
	id,
	playerOneName,
	playerTwoName,
	playerOneScore,
	playerTwoScore,
	isFinished,
	date,
	onDelete,
}) => {
	const classes = useStyles();
	const scoreDate = new Date(date).toDateString();
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [message, setMessage] = useState();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/${id}`,
				{
					method: 'DELETE',
				}
			);
			const responseData = await response.json();

			setMessage(responseData.message);
			handleToastOpen();
			setTimeout(() => onDelete(id), 3000);
		} catch (err) {
			console.log(err);
		}
	};

	const handleToastOpen = () => {
		setToastOpen(true);
	};

	const handleToastClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setToastOpen(false);
	};

	const findWinner = () => {
		if (isFinished === true) {
			if (playerOneScore > playerTwoScore) {
				return `${playerOneName} wins!`;
			} else if (playerOneScore < playerTwoScore) {
				return `${playerTwoName} wins!`;
			} else {
				return 'Game tied!';
			}
		}
	};

	const winnerText = findWinner();

	return (
		<>
			<Toast
				open={toastOpen}
				duration={3000}
				onClose={handleToastClose}
				message={message}
			/>
			<Dialog
				variant='outlined'
				color='primary'
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Delete Game?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this game?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} startIcon={<CancelIcon />}>
						CANCEL
					</Button>
					<Button
						variant='outlined'
						color='secondary'
						onClick={handleDelete}
						startIcon={<DeleteForeverIcon />}
					>
						DELETE
					</Button>
				</DialogActions>
			</Dialog>

			<li className={classes.item}>
				<Card key={id} id={id} className={classes.card}>
					<CardHeader title={scoreDate} />
					<CardContent>
						<Grid container className={classes.container}>
							<Grid item className={classes.cardTextA}>
								<Typography>{playerOneName}</Typography>
								<Typography>{playerOneScore}</Typography>
							</Grid>
							<Grid item className={classes.cardTextB}>
								<Typography>{playerTwoName}</Typography>
								<Typography>{playerTwoScore}</Typography>
							</Grid>
						</Grid>
						<Typography className={classes.cardTextC}>{winnerText}</Typography>
					</CardContent>
					<CardActions className={classes.cardActions}>
						{!isFinished && (
							<>
								<Button
									onClick={() => history.push(`/update/${id}`)}
									startIcon={<EditIcon />}
								>
									EDIT
								</Button>
								<Button
									variant='outlined'
									color='secondary'
									onClick={handleClickOpen}
									startIcon={<DeleteIcon />}
								>
									DELETE
								</Button>
							</>
						)}
					</CardActions>
				</Card>
			</li>
		</>
	);
};

export default ScoreItem;
