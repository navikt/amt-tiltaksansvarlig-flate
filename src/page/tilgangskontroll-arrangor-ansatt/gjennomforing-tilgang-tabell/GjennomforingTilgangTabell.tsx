import { Alert, Button, Table } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { GjennomforingTilgang } from '../../../api/data/gjennomforing-tilgang'

interface GjennomforingTilgangTabellProps {
	gjennomforingTilganger: GjennomforingTilgang[]
	className?: string
}

export const GjennomforingTilgangTabell = (props: GjennomforingTilgangTabellProps): React.ReactElement => {
	const gjennomforingTilganger = props.gjennomforingTilganger

	if (gjennomforingTilganger.length === 0) {
		return <Alert variant="info">Ingen tilganger lagt til</Alert>
	}

	return (
		<Table className={cls('tabell', props.className)} zebraStripes={true}>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell role="columnheader">Gjennomføring</Table.HeaderCell>
					<Table.HeaderCell role="columnheader">Virksomhet</Table.HeaderCell>
					<Table.HeaderCell role="columnheader">Opprettet av</Table.HeaderCell>
					<Table.HeaderCell role="columnheader"></Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{props.gjennomforingTilganger.map(tilgang => {
					return (
						<Table.Row key={tilgang.id}>
							<Table.DataCell>{tilgang.gjennomforingNavn}</Table.DataCell>
							<Table.DataCell>{tilgang.virksomhetNavn}</Table.DataCell>
							<Table.DataCell>{tilgang.opprettetAvNavIdent}</Table.DataCell>
							<Table.DataCell>
								<Button variant="tertiary">Fjern</Button>
							</Table.DataCell>
						</Table.Row>
					)
				})}
			</Table.Body>
		</Table>
	)
}