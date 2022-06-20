import React from 'react'
import cls from 'classnames'
import styles from './PanelLinje.module.scss'

interface PanelLinjeProps {
	children: React.ReactNode
	className?: string
}

export const PanelLinje = ({ children, className } : PanelLinjeProps): React.ReactElement => {
	return (
		<div className={cls(styles.linjeWrapper, className)}>
			{children}
		</div>
	)
}