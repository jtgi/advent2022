import { setupBlitzServer } from '@blitzjs/next';
import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from '@blitzjs/auth';
import { BlitzLogger } from 'blitz';
import { authConfig } from './blitz-client';
import db from 'db';

export const { gSSP, gSP, api } = setupBlitzServer({
	plugins: [
		AuthServerPlugin({
			...authConfig,
			storage: PrismaStorage(db),
			isAuthorized: simpleRolesIsAuthorized
		})
	],
	logger: BlitzLogger({})
});
