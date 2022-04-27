import env, { EnvironmentType } from './environment'

const amtTiltaksarrangorFlateBaseUrl = (): string => {
	switch (env.appEnv) {
		case EnvironmentType.LOCAL:
			return 'http://localhost:3000'
		case EnvironmentType.DEMO:
			return 'https://navikt.github.io/amt-tiltaksarrangor-flate'
		case EnvironmentType.DEV:
			return 'https://amt.dev.nav.no'
		case EnvironmentType.PROD:
			return 'https://nav.no'
	}

	throw Error('Unknown environment ' + env.appEnv)
}

export const opprettTilgangInvitasjonLenke = (invitasjonId: string): string => {
	return `${amtTiltaksarrangorFlateBaseUrl()}/tiltaksarrangor/deltakeroversikt/tilgang/invitasjon/${invitasjonId}`
}