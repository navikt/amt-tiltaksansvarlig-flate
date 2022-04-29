import { z } from 'zod'

const processStringToDate = z.preprocess((val) => (val? new Date(val as string): null), z.date())

export const IsAuthenticatedSchema = z.object({
	loggedIn: z.boolean()
})

export const InnloggetNavAnsattSchema = z.object({
	navIdent: z.string(),
	navn: z.string(),
})

export const ArrangorAnsattSchema = z.object({
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
})

export const ArrangorSchema = z.object({
	virksomhetNavn: z.string(),
	organisasjonNavn: z.string().nullable()
})

export const GjennomforingSchema = z.object({
	id: z.string(),
	navn: z.string(),
})

export const GjennomforingDetaljerSchema = z.object({
	navn: z.string(),
	id: z.string(),
	startDato: processStringToDate,
	sluttDato: processStringToDate,
	arrangor: ArrangorSchema
})

export const TilgangSchema = z.object({
	id: z.string().uuid(),
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	opprettetDato: processStringToDate,
	opprettetAvNavIdent: z.string()
})

export const UbruktTilgangInvitasjonSchema = z.object({
	id: z.string().uuid(),
	opprettetAvNavIdent: z.string(),
	opprettetDato: processStringToDate,
	gyldigTilDato: processStringToDate,
})

export const TilgangForesporselSchema = z.object({
	id: z.string().uuid(),
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	fodselsnummer: z.string(),
	opprettetDato: processStringToDate,
})

export const BrukerSchema = z.object({
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	fodselsnummer: z.string(),
})

export const EndringsmeldingSchema = z.object({
	id: z.string().uuid(),
	bruker: BrukerSchema,
	startDato: processStringToDate,
	aktiv: z.boolean(),
	godkjent: z.boolean(),
	arkivert: z.boolean(),
	opprettetAvArrangorAnsatt: ArrangorAnsattSchema,
	opprettetDato: processStringToDate
})

export const EndringsmeldingerSchema = z.array(EndringsmeldingSchema)
export const GjennomforingerSchema = z.array(GjennomforingSchema)
export const TilgangerSchema = z.array(TilgangSchema)
export const UbrukteTilgangInvitasjonerSchema = z.array(UbruktTilgangInvitasjonSchema)
export const TilgangForesporslerSchema = z.array(TilgangForesporselSchema)