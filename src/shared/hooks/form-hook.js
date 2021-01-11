import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

export function useForm(initialFValues) {
	const [formValues, setFormValues] = useState(initialFValues);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
		console.log(formValues[name]);
	};

	return {
		formValues,
		setFormValues,
		handleInputChange,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiFormControl-root': {
			width: '80%',
			margin: theme.spacing(1),
		},
	},
}));

export function Form(props) {
	const classes = useStyles();

	return (
		<form className={classes.root} autoComplete='off'>
			{props.children}
		</form>
	);
}
