import { z } from 'zod'
import { processStringToDate } from '../utils'


export enum EndringsmeldingType {
    LEGG_TIL_OPPSTARTSDATO = 'LEGG_TIL_OPPSTARTSDATO',
    ENDRE_OPPSTARTSDATO = 'ENDRE_OPPSTARTSDATO',
    FORLENG_DELTAKELSE = 'FORLENG_DELTAKELSE',
    AVSLUTT_DELTAKELSE = 'AVSLUTT_DELTAKELSE',
    DELTAKER_IKKE_AKTUELL = 'DELTAKER_IKKE_AKTUELL',
}

export enum EndringsmeldingStatus {
    AKTIV = 'AKTIV',
    UTDATERT = 'UTDATERT',
    UTFORT = 'UTFORT',
}

const EndringsmeldingStatusSchema = z.nativeEnum(EndringsmeldingStatus)

const DeltakerSchema = z.object({
	fornavn: z.string(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string(),
	fodselsnummer: z.string(),
})

export const EndringsmeldingBaseSchema = z.object({
	id: z.string().uuid(),
	deltaker: DeltakerSchema,
	status: EndringsmeldingStatusSchema,
	opprettetDato: processStringToDate,
})


export const LeggTilOppstartsdatoEndringsmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO),
	innhold: z.object({ oppstartsdato: processStringToDate }),
}))

export const AvsluttDeltakelseEndringsmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	id: z.string().uuid(),
	type: z.literal(EndringsmeldingType.AVSLUTT_DELTAKELSE),
	innhold: z.object({ sluttdato: processStringToDate, aarsak: z.string() }),
}))


export const EndringsmeldingSchema = z.union([ LeggTilOppstartsdatoEndringsmeldingSchema, AvsluttDeltakelseEndringsmeldingSchema ])

export const EndringsmeldingerSchema = z.array(EndringsmeldingSchema)

export type Endringsmelding = z.infer<typeof EndringsmeldingSchema>

export type LeggTilOppstartsdatoEndringsmelding = z.infer<typeof LeggTilOppstartsdatoEndringsmeldingSchema>

export type AvsluttDeltakelseEndringsmelding = z.infer<typeof AvsluttDeltakelseEndringsmeldingSchema>
