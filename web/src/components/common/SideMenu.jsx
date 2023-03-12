import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	List,
	ListItem,
	ListItemButton,
	Collapse,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material';
import {
	ChevronRightOutlined,
	ArrowDropUpOutlined,
	ArrowDropDownOutlined,
} from '@mui/icons-material';
import navItems from 'menu/navItems';
import DropDown from 'components/DropDown';

const SideMenu = ({ currentUser, modules }) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('');
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const theme = useTheme();

	const handleClick = () => {
		setOpen((prev) => !prev);
	};

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	// compare Scope and modules and return the modules list
	const filteredModules = modules?.filter((module) => {
		return currentUser?.scope?.some((perm) => {
			return perm.module === module._id;
		});
	});

	// Compare the returned modules list name with navitems to verify
	function filterNavItems(menu, filterFn) {
		return menu.filter((navItem) => {
			if (navItem.subMenu) {
				const filteredSubMenu = filterNavItems(navItem.subMenu, filterFn);
				navItem.subMenu = filteredSubMenu;
			}
			return (
				filterFn(navItem) || (navItem.subMenu && navItem.subMenu.length > 0)
			);
		});
	}

	let filteredNavItems;

	if (currentUser.isSuperUser) {
		filteredNavItems = navItems;
	} else {
		filteredNavItems = filterNavItems(navItems, (navItem) => {
			return filteredModules?.some((scopedMenu) => {
				return scopedMenu.name === navItem.text || !navItem.toVerify;
			});
		});
	}

	return (
		<List>
			{filteredNavItems.map(({ text, icon, subMenu }) => {
				if (!icon) {
					return (
						<Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
							{text}
						</Typography>
					);
				}
				const lcText = text.toLowerCase();

				return (
					<>
						<ListItem key={text} disablePadding>
							<ListItemButton
								onClick={() => {
									subMenu ? handleClick() : navigate(`/${lcText}`);
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
								{active === lcText && !subMenu && (
									<ChevronRightOutlined sx={{ ml: 'auto' }} />
								)}
								{subMenu &&
									(open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />)}
							</ListItemButton>
						</ListItem>
						{subMenu && (
							<Collapse in={open} timeout='auto' unmountOnExit>
								<DropDown menuOptions={subMenu} />
							</Collapse>
						)}
					</>
				);
			})}
		</List>
	);
};

export default React.memo(SideMenu);
