import { Alert, Button, Table } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { AnsattTilgang } from '../../../api/data/ansatt-tilgang'

interface VirksomhetTilgangTabellProps {
	ansattTilganger: AnsattTilgang[]
	className?: string
}

export const VirksomhetTilgangTabell = (props: VirksomhetTilgangTabellProps): React.ReactElement => {
	const ansattTilganger = props.ansattTilganger

	if (ansattTilganger.length === 0) {
		return <Alert variant="info">Ingen tilganger lagt til</Alert>
	}

	return (
		<Table className={cls('tabell', props.className)} zebraStripes={true}>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell role="columnheader">Virksomhet</Table.HeaderCell>
					<Table.HeaderCell role="columnheader">Rolle</Table.HeaderCell>
					<Table.HeaderCell role="columnheader">Opprettet av</Table.HeaderCell>
					<Table.HeaderCell role="columnheader"></Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{props.ansattTilganger.map(tilgang => {
					return (
						<Table.Row key={tilgang.id}>
							<Table.DataCell>{tilgang.virksomhetNavn}</Table.DataCell>
							<Table.DataCell>{tilgang.rolle}</Table.DataCell>
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