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
	gyldigFraDato: processStringToDate,
	opprettetAvNavIdent: z.string()
})

export const DeltakereSchema = z.array(DeltakerSchema)
export const GjennomforingerSchema = z.array(GjennomforingSchema)
export const AnsattTilgangerSchema = z.array(AnsattTilgangSchema)