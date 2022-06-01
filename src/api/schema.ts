import { z } from 'zod'

const processStringToDate = z.preprocess((val) => (val? new Date(val as string): null), z.date())

export const InnloggetNavAnsattSchema = z.object({
	navIdent: z.string(),
	navn: z.string(),
	tilganger: z.array(z.string())
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
	lopenr: z.number(),
	opprettetAar: z.number(),
	arrangorNavn: z.string()
})

export const GjennomforingDetaljerSchema = z.object({
	navn: z.string(),
	id: z.string(),
	startDato: processStringToDate,
	sluttDato: processStringToDate,
	arrangor: ArrangorSchema,
	tiltakNavn: z.string(),
	lopenr: z.number().int(),
	opprettetAr: z.number().int()
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

export const HentGjennomforingMedLopenrSchema = z.object({
	id: z.string().uuid(),
	navn: z.string(),
	lopenr: z.number().int(),
	opprettetAr: z.number().int(),
	arrangorNavn: z.string()
})

export const HentGjennomforingerMedLopenrSchema = z.array(HentGjennomforingMedLopenrSchema)
export const EndringsmeldingerSchema = z.array(EndringsmeldingSchema)
export const GjennomforingerSchema = z.array(GjennomforingSchema)