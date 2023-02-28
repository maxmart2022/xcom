import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'context/UserProvider';
import { ModuleContext } from 'context/ModuleProvider';
import { hasPermission } from 'utils/hasPermission';
import useAuth from 'hooks/useAuth';

const RequirePermission = ({ allowedModule, allowedAction }) => {
	const currentUser = useContext(UserContext);
	const modules = useContext(ModuleContext);
	const location = useLocation();
	const { auth } = useAuth();

	const permissionGranted = hasPermission(
		allowedModule,
		allowedAction,
		currentUser,
		modules
	);

	return permissionGranted ? (
		<Outlet />
	) : auth?.accessToken ? (
		<Navigate to='/access-forbidden' state={{ from: location }} replace />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

export default RequirePermission;
