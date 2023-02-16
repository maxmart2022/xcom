import {
	HomeOutlined,
	AccessibilityNewOutlined,
	ViewModuleOutlined,
	ShoppingCartOutlined,
	Groups2Outlined,
	CategoryOutlined,
	AttachMoneyOutlined,
} from '@mui/icons-material';

const navItems = [
	{
		text: 'Dashboard',
		icon: <HomeOutlined />,
	},
	{
		text: 'Developer Options',
		icon: null,
	},
	{
		text: 'Actions',
		icon: <AccessibilityNewOutlined />,
	},
	{
		text: 'Modules',
		icon: <ViewModuleOutlined />,
	},
	{
		text: 'Ecommerce Options',
		icon: null,
	},
	{
		text: 'Users',
		icon: <Groups2Outlined />,
	},
	{
		text: 'Categories',
		icon: <CategoryOutlined />,
	},
	{
		text: 'Brands',
		icon: <AttachMoneyOutlined />,
	},
	{
		text: 'Products',
		icon: <ShoppingCartOutlined />,
	},
];

export default navItems;
