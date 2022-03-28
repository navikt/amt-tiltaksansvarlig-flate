import env from './environment'

export const opprettTilgangInvitasjonLenke = (invitasjonId: string): string => {
	const domain = env.isProd ? 'https://nav.no' : 'https://amt.dev.nav.no'
	const path = `/tiltaksarrangor/deltakeroversikt/tilgang/invitasjon/${invitasjonId}`

	return domain + path
}