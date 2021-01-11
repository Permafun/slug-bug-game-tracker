import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
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

const TodayScore = () => {
	const classes = useStyles();

	return (
		<>
			<Paper className={classes.pageContent}>
				<ScoreForm
					initialState={initialValues}
					url='http://localhost:5000/api/scores'
					methodOnSave='POST'
					update={false}
					duration={3000}
					message='Score Saved!'
				/>
			</Paper>
		</>
	);
};

export default TodayScore;
