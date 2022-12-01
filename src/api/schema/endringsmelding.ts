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
    TILBAKEKALT = 'TILBAKEKALT',
    UTDATERT = 'UTDATERT',
    UTFORT = 'UTFORT',
}

const EndringsmeldingStatusSchema = z.nativeEnum(EndringsmeldingStatus)

export enum DeltakerStatusAarsakType {
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

const DeltakerStatusAarsakSchema = z.object({
	type: z.nativeEnum(DeltakerStatusAarsakType),
	beskrivelse: z.string().nullable()
})

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
	innhold: z.object({ sluttdato: processStringToDate, aarsak: DeltakerStatusAarsakSchema }),
}))

export const DeltakerIkkeAktuellEndringsmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.DELTAKER_IKKE_AKTUELL),
	innhold: z.object({ aarsak: DeltakerStatusAarsakSchema }),
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

export type LeggTilOppstartsdatoEndringsmelding = z.infer<typeof LeggTilOppstartsdatoEndringsmeldingSchema>

export type EndreOppstartsdatoEndringsmelding = z.infer<typeof EndreOppstartsdatoEndringsmeldingSchema>

export type ForlengDeltakelseEndringsmelding = z.infer<typeof ForlengDeltakelseEndringsmeldingSchema>

export type AvsluttDeltakelseEndringsmelding = z.infer<typeof AvsluttDeltakelseEndringsmeldingSchema>

export type DeltakerIkkeAktuellEndringsmelding = z.infer<typeof DeltakerIkkeAktuellEndringsmeldingSchema>

export type DeltakerStatusAarsak = z.infer<typeof DeltakerStatusAarsakSchema>
