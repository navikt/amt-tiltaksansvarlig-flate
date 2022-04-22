import React from 'react'
import { BodyShort, Button, Detail, Heading, Panel } from '@navikt/ds-react'
import styles from './Endringsmelding.module.scss'
import classNames from 'classnames'
import { EndringsmeldingType } from '../api/api'
import { formatDate } from '../utils/date-utils'
import { fnrTilFdato, lagKommaSeparertBrukerNavn } from '../utils/bruker-utils'

interface PanelLinjeProps {
	children: React.ReactNode
}

const PanelLinje = ({ children } : PanelLinjeProps): React.ReactElement => {
	return <div className={styles.linjeWrapper}>
		{children}
	</div>
}

interface DeltakerPanelProps {
	endringsmelding: EndringsmeldingType
}

export const Endringsmelding = ({ endringsmelding }: DeltakerPanelProps): React.ReactElement => {
	const bruker = endringsmelding.bruker
	const navn = lagKommaSeparertBrukerNavn(bruker.fornavn, bruker.mellomnavn, bruker.etternavn)
	return(
		<Panel className={styles.panel}>
			<PanelLinje>
				<Heading size="xsmall" level="3">{navn}</Heading>
				<BodyShort size="medium" className={styles.fnr} >{fnrTilFdato(bruker.fodselsnummer)}</BodyShort>
				<Detail size="small" className={classNames(styles.moveRight, styles.gray)}>Sendt: {formatDate(endringsmelding.opprettetDato)}</Detail>
			</PanelLinje>
			<PanelLinje>
				<BodyShort className={styles.endringInfoTekst}>Ny oppstartsdato: {formatDate(endringsmelding.startDato)}</BodyShort>
				<Button size="small" className={styles.moveRight}>Ferdig</Button>
			</PanelLinje>
		</Panel>
	)
}