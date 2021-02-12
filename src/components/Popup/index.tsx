import React from 'react'
import Draggable from 'react-draggable'
import {
	Button,
	Dialog,
	DialogActions,
	Paper,
	PaperProps
} from '@material-ui/core'

function PaperComponent(props: PaperProps) {
	return (
		<Draggable
			handle='#draggable-dialog-title'
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	)
}

declare interface PopupProps {
	primaryBtnLabel?: string
	primaryBtnAction?: () => void
	secondaryBtnLabel?: string
	secondaryBtnAction?: () => void
	trigger: (fn: () => void) => React.ReactNode
}

const Popup: React.FC<PopupProps> = (props) => {
	const [open, setOpen] = React.useState(false)
	const toggleOpen = () => setOpen(!open)
	return (
		<>
			{props.trigger(toggleOpen)}
			<Dialog
				open={open}
				onClose={toggleOpen}
				PaperComponent={PaperComponent}
				aria-labelledby='draggable-dialog-title'
			>
				{props.children}
				<DialogActions>
					{props.primaryBtnAction && (
						<Button
							onClick={props.primaryBtnAction}
							color='secondary'
							data-testid='confirm'
						>
							{props.primaryBtnLabel ?? 'Confirm'}
						</Button>
					)}
					{props.secondaryBtnLabel && (
						<Button onClick={toggleOpen} color='primary' data-testid='cancel'>
							{props.secondaryBtnLabel}
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</>
	)
}

export default Popup
