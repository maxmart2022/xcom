export const hasPermission = (
	allowedModule,
	allowedAction,
	currentUser,
	modules
) => {
	return currentUser?.isSuperUser
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
};
