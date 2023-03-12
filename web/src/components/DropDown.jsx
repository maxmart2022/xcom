import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';
import {
	ChevronRightOutlined,
	ArrowDropDownOutlined,
} from '@mui/icons-material';

const DropDown = ({ menuOptions }) => {
	const theme = useTheme();
	const [active, setActive] = useState('');
	const navigate = useNavigate();

	return (
		<List>
			{menuOptions.map(({ text, icon, subMenu }) => {
				if (!icon) {
					return (
						<Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
							{text}
						</Typography>
					);
				}
				const lcText = text.toLowerCase();

				return (
					<ListItem key={text} disablePadding>
						<ListItemButton
							onClick={() => {
								navigate(`/${lcText}`);
								setActive(lcText);
							}}
							sx={{
								backgroundColor:
									active === lcText
										? theme.palette.secondary[300]
										: 'transparent',
								color:
									active === lcText
										? theme.palette.primary[600]
										: theme.palette.secondary[100],
							}}
						>
							<ListItemIcon
								sx={{
									ml: '2rem',
									color:
										active === lcText
											? theme.palette.primary[600]
											: theme.palette.secondary[200],
								}}
							>
								{icon}
							</ListItemIcon>
							<ListItemText primary={text} />
							{active === lcText && (
								<ChevronRightOutlined sx={{ ml: 'auto' }} />
							)}
							{subMenu && <ArrowDropDownOutlined sx={{ ml: 'auto' }} />}
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};

export default DropDown;
