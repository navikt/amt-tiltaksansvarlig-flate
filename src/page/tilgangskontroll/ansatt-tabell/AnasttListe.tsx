import { Alert, Table } from '@navikt/ds-react'
import React from 'react'

import { Ansatt } from '../../../api/data/ansatt'
import { formatDateStr } from '../../../utils/date-utils'

interface AnsattTabellProps {
	ansatte: Ansatt[]
}

export const AnsattTabell = (props: AnsattTabellProps): React.ReactElement => {
	const ansatte = props.ansatte

	if (ansatte.length === 0) {
		return <Alert variant="info">Ingen ansatte er lagt til</Alert>
	}

	return (
		<Table className="tabell" zebraStripes={true}>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell role="columnheader">Navn</Table.HeaderCell>
					<Table.HeaderCell role="columnheader">Opprettet</Table.HeaderCell>
					<Table.HeaderCell role="columnheader">Opprettet av</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{props.ansatte.map(a => {
					return (
						<Table.Row key={a.id}>
							<Table.DataCell>{a.etternavn}, {a.fornavn}</Table.DataCell>
							<Table.DataCell>{formatDateStr(a.opprettetDato)}</Table.DataCell>
							<Table.DataCell>{a.opprettetAvNavIdent}</Table.DataCell>
						</Table.Row>
					)
				})}
			</Table.Body>
		</Table>
	)
}