import { z } from 'zod'

const processStringToDate = z.preprocess((val) => (val? new Date(val as string): null), z.date())

export const ArrangorSchema = z.object({
	virksomhetNavn: z.string(),
	organisasjonNavn: z.string().nullable()
})

export const GjennomforingSchema = z.object({
	navn: z.string(),
	id: z.string(),
	startDato: processStringToDate,
	sluttDato: processStringToDate,
	arrangor: ArrangorSchema
})


export const DeltakerSchema = z.object({
	id: z.string(),
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	fodselsnummer: z.string(),
	startDato: processStringToDate.nullable(),
	sluttDato: processStringToDate.nullable(),
	status: z.string(),
	registrertDato: processStringToDate
})

export const AnsattTilgangSchema = z.object({
	id: z.string().uuid(),
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	opprettetDato: processStringToDate,
	opprettetAvNavIdent: z.string()
})

export const AnsattTilgangInvitasjonSchema = z.object({
	id: z.string().uuid(),
	invitertAnsatt: z.object({
		fornavn: z.string(),
		mellomnavn: z.string().nullable(),
		etternavn: z.string(),
		fodselsnummer: z.string()
	}).nullable(),
	tidspunktBrukt: processStringToDate.nullable(),
	erBrukt: z.boolean(),
	opprettetDato: processStringToDate,
	gyldigTilDato: processStringToDate,
})

export const DeltakereSchema = z.array(DeltakerSchema)
export const GjennomforingerSchema = z.array(GjennomforingSchema)
export const AnsattTilgangerSchema = z.array(AnsattTilgangSchema)
export const AnsattTilgangInvitasjonerSchema = z.array(AnsattTilgangInvitasjonSchema)
