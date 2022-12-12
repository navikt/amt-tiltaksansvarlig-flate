class Environment {

	get isMockEnabled(): boolean {
		return import.meta.env.VITE_MOCK === 'true'
	}

	get baseUrl(): string {
		return import.meta.env.BASE_URL
	}
}

const env = new Environment()

export default env
