import React, { useEffect, useState } from 'react';
import ScoreList from '../components/ScoreList';

const ScoreHistory = () => {
	const [loadedScores, setLoadedScores] = useState([]);

	useEffect(() => {
		const fetchScores = async () => {
			try {
				const responseData = await fetch(
					`${process.env.REACT_APP_BACKEND_URL}`
				);
				const response = await responseData.json();
				setLoadedScores(response.scores);
			} catch (err) {}
		};
		fetchScores();
	}, []);

	const scoreDeleteHandler = (deletedScoreId) => {
		setLoadedScores((prevScores) =>
			prevScores.filter((score) => score.id !== deletedScoreId)
		);
	};

	return (
		<>
			<ScoreList items={loadedScores} onDeleteScore={scoreDeleteHandler} />
		</>
	);
};

export default ScoreHistory;
