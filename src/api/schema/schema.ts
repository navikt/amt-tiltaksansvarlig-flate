import { z } from 'zod'

import { processStringToDate } from '../utils'

export const TiltakSchema = z.object({
	kode: z.string(),
	navn: z.string(),
})

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
	arrangorNavn: z.string(),
	antallAktiveEndringsmeldinger: z.number().int(),
	tiltak: TiltakSchema,
})

export const GjennomforingDetaljerSchema = z.object({
	navn: z.string(),
	id: z.string(),
	startDato: processStringToDate.nullable(),
	sluttDato: processStringToDate.nullable(),
	arrangor: ArrangorSchema,
	lopenr: z.number().int(),
	opprettetAr: z.number().int(),
	tiltak: TiltakSchema,
})

export const HentGjennomforingMedLopenrSchema = z.object({
	id: z.string().uuid(),
	navn: z.string(),
	lopenr: z.number().int(),
	opprettetAr: z.number().int(),
	arrangorNavn: z.string(),
	tiltak: TiltakSchema,
})

export const HentGjennomforingerMedLopenrSchema = z.array(HentGjennomforingMedLopenrSchema)
export const GjennomforingerSchema = z.array(GjennomforingSchema)
