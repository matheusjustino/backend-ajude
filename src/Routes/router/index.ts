import { Router } from 'express';

// Arquivo que irá agrupar todas as rotas e suas funções de guard e action

const concatRoute = (basePath: any, routes: any, baseGuards: any) => {
	baseGuards = baseGuards ? baseGuards : [];
	const route = routes.map(({ path, method, guards, action }: any) => {
		if (path === '') return { path: `/${basePath}`, method, guards: guards ? baseGuards.concat(guards) : baseGuards, action };
		return {
			path   : `/${basePath}/${path}`,
			method,
			guards : guards ? baseGuards.concat(guards) : baseGuards,
			action
		};
	});

	return route;
};

const getRoutes = (routes: any) =>
	routes
		.map((route: any) => {
			// No sub-routes
			if (!route.routes) {
				const { path, method, guards, action } = route;
				return [ { path: `/${path}`, method, guards: guards ? guards : [], action } ];
			}

			return concatRoute(route.path, route.routes, route.guards);
		})
		.flat();

const handleGuards = async (guards: any, req: any, res: any) => {
	if (guards.length === 0) return true;

	const promises = guards.map((guard: any) => guard(req, res));
	const results = await Promise.all(promises);

	return results.reduce((acc, next) => acc && next);
};

export const initRoutes = (routes: any) => {
	const mappedRoutes = getRoutes(routes);
	const router: any = Router();
	mappedRoutes.forEach((route: any) => {
		router[route.method.toLowerCase()](
			route.path,
			async (req: any, res: any, next: any) => {
				const guardResult = await handleGuards(route.guards, req, res);
				if (!guardResult) return res;

				await next();
			},
			async (req: any, res: any) => await route.action(req, res)
		);
	});

	return router;
};