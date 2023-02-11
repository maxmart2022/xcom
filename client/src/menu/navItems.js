import {
	HomeOutlined,
	ShoppingCartOutlined,
	Groups2Outlined,
	CategoryOutlined,
	PointOfSaleOutlined,
	TodayOutlined,
	CalendarMonthOutlined,
	AdminPanelSettingsOutlined,
	TrendingUpOutlined,
	PieChartOutlined,
	AttachMoneyOutlined,
} from '@mui/icons-material';

const navItems = [
	{
		text: 'Dashboard',
		icon: <HomeOutlined />,
	},
	{
		text: 'Components',
		icon: null,
	},
	{
		text: 'Users',
		icon: <Groups2Outlined />,
	},
	{
		text: 'Brands',
		icon: <AttachMoneyOutlined />,
	},
	{
		text: 'Categories',
		icon: <CategoryOutlined />,
	},
	{
		text: 'Products',
		icon: <ShoppingCartOutlined />,
	},
	{
		text: 'Sales',
		icon: null,
	},
	{
		text: 'Overview',
		icon: <PointOfSaleOutlined />,
	},
	{
		text: 'Daily',
		icon: <TodayOutlined />,
	},
	{
		text: 'Monthly',
		icon: <CalendarMonthOutlined />,
	},
	{
		text: 'Breakdown',
		icon: <PieChartOutlined />,
	},
	{
		text: 'Orders',
		icon: <AttachMoneyOutlined />,
	},
	{
		text: 'Management',
		icon: null,
	},
	{
		text: 'Attributes',
		icon: <AdminPanelSettingsOutlined />,
	},
	{
		text: 'Performance',
		icon: <TrendingUpOutlined />,
	},
];

export default navItems;
