
export const TILGANG_ENDRINGSMELDING = 'ENDRINGSMELDING'

export const harTilgangTilEndringsmelding = (tilganger: string[]) => {
	return tilganger.includes(TILGANG_ENDRINGSMELDING)
}