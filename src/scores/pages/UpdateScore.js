import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import ScoreForm from '../components/ScoreForm';

const useStyles = makeStyles((theme) => ({
	pageContent: {
		margin: theme.spacing(5),
		padding: theme.spacing(3),
	},
}));

const initialValues = {
	playerOneScore: 0,
	playerTwoScore: 0,
	isFinished: false,
};

const UpdateScore = (props) => {
	const classes = useStyles();
	const scoreId = useParams().scoreId;

	return (
		<>
			<Paper className={classes.pageContent}>
				<ScoreForm
					initialState={initialValues}
					url={`${process.env.REACT_APP_BACKEND_URL}`}
					methodOnSave='PATCH'
					duration={3000}
					update={true}
					scoreId={scoreId}
					message='Score Updated!'
				/>
			</Paper>
		</>
	);
};

export default UpdateScore;
