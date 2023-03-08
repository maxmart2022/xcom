import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';

const Confirm = ({
	DialogTitle,
	DialogContent,
	open,
	handleConfirm,
	handleCancel,
}) => {
	return (
		<>
			<Dialog open={open} onClose={handleCancel}>
				<DialogTitle>{DialogTitle}</DialogTitle>
				<DialogContent>{DialogContent}</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} autoFocus>
						Cancel
					</Button>
					<Button onClick={handleConfirm}>Proceed</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Confirm;
