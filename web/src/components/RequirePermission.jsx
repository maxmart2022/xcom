import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'context/UserProvider';
import { ModuleContext } from 'context/ModuleProvider';

const RequirePermission = ({ allowedModule, allowedAction }) => {
	const modules = useContext(ModuleContext);
	const currentUser = useContext(UserContext);
	const location = useLocation();

	console.log(modules);

	const hasPermission = currentUser?.isSuperUser
		? currentUser?.isSuperUser
		: modules?.some((module) => {
				return (
					allowedModule.includes(module.name) &&
					currentUser?.scope?.some((perm) => perm.module === module._id) &&
					module.actions.some((action) => {
						return (
							allowedAction.includes(action.name) &&
							currentUser?.scope?.some((perm) =>
								perm.actions.includes(action._id)
							)
						);
					})
				);
		  });
	return hasPermission ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

export default RequirePermission;
