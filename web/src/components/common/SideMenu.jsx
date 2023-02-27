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
import { UserContext } from 'context/UserProvider';
import { ModuleContext } from 'context/ModuleProvider';

const SideMenu = () => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();
	const currentUser = useContext(UserContext);
	const modules = useContext(ModuleContext);

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	console.log(currentUser);

	// compare Scope and modules and return the modules list
	const filteredModules = modules.filter((module) => {
		return currentUser?.scope?.some((perm) => {
			return perm.module === module._id;
		});
	});

	// Compare the returned modules list name with navitems to verify
	const filteredNavItems = navItems.filter((navItem) => {
		return filteredModules.some((scopedMenu) => {
			return scopedMenu.name === navItem.text || !navItem.toVerify;
		});
	});

	const menuOptions = currentUser?.isSuperUser ? navItems : filteredNavItems;
	return (
		<List>
			{menuOptions.map(({ text, icon }) => {
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
