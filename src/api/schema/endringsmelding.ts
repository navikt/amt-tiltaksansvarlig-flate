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

export enum DeltakerStatusAarsak {
    SYK = 'SYK',
    FATT_JOBB = 'FATT_JOBB',
    TRENGER_ANNEN_STOTTE = 'TRENGER_ANNEN_STOTTE',
    FIKK_IKKE_PLASS = 'FIKK_IKKE_PLASS',
    UTDANNING = 'UTDANNING',
    FERDIG = 'FERDIG',
    AVLYST_KONTRAKT = 'AVLYST_KONTRAKT',
    IKKE_MOTT = 'IKKE_MOTT',
    FEILREGISTRERT = 'FEILREGISTRERT',
    ANNET = 'ANNET'
}

export const deltakerStatusAarsakSchema = z.nativeEnum(DeltakerStatusAarsak)

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

export const EndreOppstartsdatoEndringsmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.ENDRE_OPPSTARTSDATO),
	innhold: z.object({ oppstartsdato: processStringToDate }),
}))

export const ForlengDeltakelseEndringsmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.FORLENG_DELTAKELSE),
	innhold: z.object({ sluttdato: processStringToDate }),
}))

export const AvsluttDeltakelseEndringsmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.AVSLUTT_DELTAKELSE),
	innhold: z.object({ sluttdato: processStringToDate, aarsak: deltakerStatusAarsakSchema }),
}))

export const DeltakerIkkeAktuellEndringsmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.DELTAKER_IKKE_AKTUELL),
	innhold: z.object({ aarsak: deltakerStatusAarsakSchema }),
}))


export const EndringsmeldingSchema = z.union([
	LeggTilOppstartsdatoEndringsmeldingSchema,
	EndreOppstartsdatoEndringsmeldingSchema,
	ForlengDeltakelseEndringsmeldingSchema,
	AvsluttDeltakelseEndringsmeldingSchema,
	DeltakerIkkeAktuellEndringsmeldingSchema,
])

export const EndringsmeldingerSchema = z.array(EndringsmeldingSchema)

export type Endringsmelding = z.infer<typeof EndringsmeldingSchema>

export type EndreOppstartsdatoEndringsmelding = z.infer<typeof EndreOppstartsdatoEndringsmeldingSchema>

export type ForlengDeltakelseEndringsmelding = z.infer<typeof ForlengDeltakelseEndringsmeldingSchema>
