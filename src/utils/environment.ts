
export enum EnvironmentType {
	PROD = 'PROD',
	DEV = 'DEV',
	DEMO = 'DEMO',
	LOCAL = 'LOCAL'
}

class Environment {

	get isMockingEnabled(): boolean {
		return process.env.REACT_APP_MOCKING_ENABLED === 'true'
	}

	get publicUrl(): string {
		return process.env.PUBLIC_URL || ''
	}

	get appEnv(): EnvironmentType {
		const hostname = window.location.hostname

		if (hostname.endsWith('localhost')) {
			return EnvironmentType.LOCAL
		} else if (hostname.endsWith('github.io')) {
			return EnvironmentType.DEMO
		} else if (hostname.endsWith('dev.intern.nav.no')) {
			return EnvironmentType.DEV
		}

		return EnvironmentType.PROD
	}

	get isLocal(): boolean {
		return this.appEnv === EnvironmentType.LOCAL
	}

	get isProd(): boolean {
		return this.appEnv === EnvironmentType.PROD
	}

	get isDev(): boolean {
		return this.appEnv === EnvironmentType.DEV
	}

	get isDemo(): boolean {
		return this.appEnv === EnvironmentType.DEV
	}

}

const env = new Environment()

export default env
