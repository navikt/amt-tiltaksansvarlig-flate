import { Tag } from '@navikt/ds-react'
import React from 'react'

import styles from './AvsluttetMerkelapp.module.scss'

interface AvsluttetMerkelappProps {
	hidden: boolean;
}

export const AvsluttetMerkelapp = (props: AvsluttetMerkelappProps ): React.ReactElement<boolean> | null => {
	if (props.hidden) return null
	return (
		<div className={styles.tags}>
			<Tag variant="warning" size="small">
			Avsluttet
			</Tag>
		</div>
	)
}