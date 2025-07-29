import { z } from 'zod'

import { processStringToDate, processStringToNullableDate } from '../utils'

export enum EndringsmeldingType {
	LEGG_TIL_OPPSTARTSDATO = 'LEGG_TIL_OPPSTARTSDATO',
	ENDRE_OPPSTARTSDATO = 'ENDRE_OPPSTARTSDATO',
	FORLENG_DELTAKELSE = 'FORLENG_DELTAKELSE',
	AVSLUTT_DELTAKELSE = 'AVSLUTT_DELTAKELSE',
	DELTAKER_IKKE_AKTUELL = 'DELTAKER_IKKE_AKTUELL',
	ENDRE_DELTAKELSE_PROSENT = 'ENDRE_DELTAKELSE_PROSENT',
	ENDRE_SLUTTDATO = 'ENDRE_SLUTTDATO',
	ENDRE_SLUTTAARSAK = 'ENDRE_SLUTTAARSAK',
}

export enum Vurderingstype {
	OPPFYLLER_KRAVENE = 'OPPFYLLER_KRAVENE',
	OPPFYLLER_IKKE_KRAVENE = 'OPPFYLLER_IKKE_KRAVENE'
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

export enum Adressebeskyttelse {
	STRENGT_FORTROLIG = 'STRENGT_FORTROLIG',
	FORTROLIG = 'FORTROLIG',
	STRENGT_FORTROLIG_UTLAND = 'STRENGT_FORTROLIG_UTLAND'
}

export const AdressebeskyttelseSchema = z.nativeEnum(Adressebeskyttelse)

// For skjermede deltakere sendes ikke navn og fnr om ikke innlogget bruker har tilgang
const DeltakerSchema = z.object({
	fornavn: z.string().nullable(),
	mellomnavn: z.string().nullable(),
	etternavn: z.string().nullable(),
	fodselsnummer: z.string().nullable(),
	erSkjermet: z.boolean(),
	adressebeskyttelse: AdressebeskyttelseSchema.nullable(),
})

export const EndringsmeldingBaseSchema = z.object({
	id: z.string().uuid(),
	deltaker: DeltakerSchema,
	status: EndringsmeldingStatusSchema,
	opprettetDato: processStringToDate,
	utfortTidspunkt: processStringToNullableDate,
})

export const LeggTilOppstartsdatoEndringsmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO),
	innhold: z.object({ oppstartsdato: processStringToDate }),
}))

export const EndreOppstartsdatoEndringsmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.ENDRE_OPPSTARTSDATO),
	innhold: z.object({ oppstartsdato: processStringToNullableDate }),
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

export const DeltakelseProsentEndringmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT),
	innhold: z.object({ deltakelseProsent: z.number(), dagerPerUke: z.number().nullable(), gyldigFraDato: processStringToNullableDate }),
}))

export const EndreSluttdatoEndringmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.ENDRE_SLUTTDATO),
	innhold: z.object({ sluttdato: processStringToDate }),
}))

export const EndreSluttaarsakEndringsmeldingSchema = z.intersection(EndringsmeldingBaseSchema, z.object({
	type: z.literal(EndringsmeldingType.ENDRE_SLUTTAARSAK),
	innhold: z.object({ aarsak: DeltakerStatusAarsakSchema }),
}))

export const EndringsmeldingSchema = z.union([
	LeggTilOppstartsdatoEndringsmeldingSchema,
	EndreOppstartsdatoEndringsmeldingSchema,
	ForlengDeltakelseEndringsmeldingSchema,
	AvsluttDeltakelseEndringsmeldingSchema,
	DeltakerIkkeAktuellEndringsmeldingSchema,
	DeltakelseProsentEndringmeldingSchema,
	EndreSluttdatoEndringmeldingSchema,
	EndreSluttaarsakEndringsmeldingSchema
])

export const VurderingSchema = z.object({
	id: z.string().uuid(),
	deltaker: DeltakerSchema,
	vurderingstype: z.nativeEnum(Vurderingstype),
	opprettetDato: processStringToDate,
	begrunnelse: z.string().nullable()
})

export const MeldingerFraArrangorSchema = z.object({
	endringsmeldinger: z.array(EndringsmeldingSchema),
	vurderinger: z.array(VurderingSchema)
})

export type Endringsmelding = z.infer<typeof EndringsmeldingSchema>

export type DeltakerStatusAarsak = z.infer<typeof DeltakerStatusAarsakSchema>

export type MeldingerFraArrangor = z.infer<typeof MeldingerFraArrangorSchema>

export type Vurdering = z.infer<typeof VurderingSchema>
