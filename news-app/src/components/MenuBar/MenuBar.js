import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link } from 'react-router-dom';
export default function MenuBar() {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};
	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};
	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}
	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}
		prevOpen.current = open;
	}, [open]);
	return (
		<Stack direction='row' spacing={2}>
			<div style={{ position: 'relative', zIndex: open ? 1 : 'inherit' }}>
				<Button
					ref={anchorRef}
					id='composition-button'
					aria-controls={open ? 'composition-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup='true'
					onClick={handleToggle}>
					<MoreVertIcon />
					{/* <MenuOutlinedIcon style={{ color: 'black' }} /> */}
				</Button>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					placement='bottom-start'
					transition
					disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === 'bottom-start' ? 'left top' : 'left bottom',
							}}>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id='composition-menu'
										aria-labelledby='composition-button'
										onKeyDown={handleListKeyDown}>
										<Link
											to='/'
											style={{ textDecoration: 'none', color: 'black' }}>
											<MenuItem onClick={handleClose}>Home</MenuItem>
										</Link>
										<Link
											to='/savedarticles'
											style={{ textDecoration: 'none', color: 'black' }}>
											<MenuItem onClick={handleClose}>Saved Articles</MenuItem>
										</Link>
										<MenuItem onClick={handleClose}>About</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</Stack>
	);
}
