import { z } from 'zod'

import { processStringToDate } from '../utils'
import { AdressebeskyttelseSchema } from './meldinger'


export enum GjennomforingStatus {
	PLANLAGT = 'PLANLAGT',
	GJENNOMFORES = 'GJENNOMFORES',
	AVSLUTTET = 'AVSLUTTET'
}

export enum Tiltakskode {
	ARBFORB = 'ARBFORB',
	ARBRRHDAG = 'ARBRRHDAG',
	AVKLARAG = 'AVKLARAG',
	INDOPPFAG = 'INDOPPFAG',
	DIGIOPPARB = 'DIGIOPPARB',
	GRUFAGYRKE = 'GRUFAGYRKE',
	GRUPPEAMO = 'GRUPPEAMO',
	JOBBK = 'JOBBK',
	VASV = 'VASV',
}

const GjennomforingStatusSchema = z.nativeEnum(GjennomforingStatus)
const TiltakskodeSchema = z.nativeEnum(Tiltakskode)


export const TiltakSchema = z.object({
	kode: TiltakskodeSchema,
	navn: z.string()
})

export const InnloggetNavAnsattSchema = z.object({
	navIdent: z.string(),
	navn: z.string(),
	tilganger: z.array(z.string())
})

export const ArrangorSchema = z.object({
	virksomhetNavn: z.string(),
	virksomhetOrgnr: z.string(),
	organisasjonNavn: z.string().nullable(),
	organisasjonOrgnr: z.string().nullable()
})

export const GjennomforingSchema = z.object({
	id: z.string(),
	navn: z.string(),
	lopenr: z.number(),
	opprettetAar: z.number(),
	arrangorNavn: z.string(),
	antallAktiveEndringsmeldinger: z.number().int(),
	harSkjermedeDeltakere: z.boolean(),
	adressebeskyttelser: z.array(AdressebeskyttelseSchema),
	tiltak: TiltakSchema,
	startDato: processStringToDate.nullable(),
	sluttDato: processStringToDate.nullable(),
	status: GjennomforingStatusSchema,
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
	status: GjennomforingStatusSchema,
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
