import React from 'react';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function Toast(props) {
	return (
		<>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={props.open}
				autoHideDuration={props.duration}
				onClose={props.onClose}
				message={props.message}
				action={
					<React.Fragment>
						{/* <Button color='secondary' size='small' onClick={props.onClose}>
							UNDO
						</Button> */}
						<IconButton
							size='small'
							aria-label='close'
							color='inherit'
							onClick={props.onClose}
						>
							<CloseIcon fontSize='small' />
						</IconButton>
					</React.Fragment>
				}
			/>
		</>
	);
}
