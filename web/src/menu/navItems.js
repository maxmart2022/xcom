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
		toVerify: false,
	},
	{
		text: 'Developer Options',
		icon: null,
		toVerify: true,
	},
	{
		text: 'Actions',
		icon: <AccessibilityNewOutlined />,
		toVerify: true,
	},
	{
		text: 'Modules',
		icon: <ViewModuleOutlined />,
		toVerify: true,
	},
	{
		text: 'Ecommerce Options',
		icon: null,
		toVerify: false,
	},
	{
		text: 'Users',
		icon: <Groups2Outlined />,
		toVerify: true,
	},
	{
		text: 'Categories',
		icon: <CategoryOutlined />,
		toVerify: true,
	},
	{
		text: 'Brands',
		icon: <AttachMoneyOutlined />,
		toVerify: true,
	},
	{
		text: 'Products',
		icon: <ShoppingCartOutlined />,
		toVerify: true,
	},
];

export default navItems;
