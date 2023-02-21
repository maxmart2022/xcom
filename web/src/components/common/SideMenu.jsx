import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';
import { ChevronRightOutlined } from '@mui/icons-material';
import navItems from 'menu/navItems';
import { UserContext } from 'state/UserProvider';

const SideMenu = () => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();
	const user = useContext(UserContext);

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	const filteredNavItems = user.currentUser.isSuperUser ? navItems : [];
	return (
		<List>
			{filteredNavItems.map(({ text, icon }) => {
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
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};

export default React.memo(SideMenu);
