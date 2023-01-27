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
	virksomhetOrgnr: z.string(),
	organisasjonNavn: z.string().nullable(),
	organisasjonOrgnr: z.string().nullable()
})

export enum GjennomforingStatus {
	IKKE_STARTET = 'IKKE_STARTET',
	GJENNOMFORES = 'GJENNOMFORES',
	AVSLUTTET = 'AVSLUTTET',
}

const GjennomforingStatusSchema = z.nativeEnum(GjennomforingStatus)

export const GjennomforingSchema = z.object({
	id: z.string(),
	navn: z.string(),
	lopenr: z.number(),
	opprettetAar: z.number(),
	arrangorNavn: z.string(),
	antallAktiveEndringsmeldinger: z.number().int(),
	harSkjermedeDeltakere: z.boolean(),
	tiltak: TiltakSchema,
})

export const GjennomforingDetaljerSchema = z.object({
	id: z.string(),
	navn: z.string(),
	lopenr: z.number().int(),
	opprettetAr: z.number().int(),
	arrangor: ArrangorSchema,
	startDato: processStringToDate.nullable(),
	sluttDato: processStringToDate.nullable(),
	tiltak: TiltakSchema,
})

export const HentGjennomforingMedLopenrSchema = z.object({
	id: z.string().uuid(),
	navn: z.string(),
	lopenr: z.number().int(),
	status: GjennomforingStatusSchema,
	startDato: processStringToDate.nullable(),
	sluttDato: processStringToDate.nullable(),
	opprettetAr: z.number().int(),
	arrangorNavn: z.string(),
	tiltak: TiltakSchema,
})

export const HentGjennomforingerMedLopenrSchema = z.array(HentGjennomforingMedLopenrSchema)
export const GjennomforingerSchema = z.array(GjennomforingSchema)
