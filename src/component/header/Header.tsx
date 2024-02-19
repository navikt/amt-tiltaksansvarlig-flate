import { ExternalLinkIcon, MenuGridIcon } from '@navikt/aksel-icons'
import { Dropdown, InternalHeader, Spacer } from '@navikt/ds-react'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import { useDataStore } from '../../store/data-store'
import { mulighetsrommetSanityUrl, navArbeidsmarkedstiltakUrl, tiltaksadministrasjonUrl } from '../../utils/url-utils'
import styles from './Header.module.scss'

export const Header = (): React.ReactElement => {
	const { innloggetAnsatt } = useDataStore()

	const tiltakstyperLinkRef = useRef<HTMLAnchorElement>(null)
	const avtalerLinkRef = useRef<HTMLAnchorElement>(null)
	const gjennomforingerLinkRef = useRef<HTMLAnchorElement>(null)
	const individuelleGjennomforingerLinkRef = useRef<HTMLAnchorElement>(null)
	const veilederflateLinkRef = useRef<HTMLAnchorElement>(null)
	const notifikasjonerLinkRef = useRef<HTMLAnchorElement>(null)
	const endringsmeldingerLinkRef = useRef<HTMLAnchorElement>(null)

	return (
		<InternalHeader className={styles.header} data-testid="innlogget-header">
			<InternalHeader.Title href={FORSIDE_PAGE_ROUTE} aria-label="lenke til startsiden">
				NAV Tiltaksadministrasjon
			</InternalHeader.Title>
			<Spacer />
			<Dropdown>
				<InternalHeader.Button as={Dropdown.Toggle}>
					<MenuGridIcon style={{ fontSize: '1.5rem' }} title="Systemer og oppslagsverk" />
				</InternalHeader.Button>

				<Dropdown.Menu>
					<Dropdown.Menu.GroupedList>
						<Dropdown.Menu.GroupedList.Item onClick={() => tiltakstyperLinkRef.current?.click()} as="span">
							<Link ref={tiltakstyperLinkRef} to={`${tiltaksadministrasjonUrl}/tiltakstyper`} target="_blank">
								Tiltakstyper
							</Link>
						</Dropdown.Menu.GroupedList.Item>

						<Dropdown.Menu.GroupedList.Item onClick={() => avtalerLinkRef.current?.click()} as="span">
							<Link ref={avtalerLinkRef} to={`${tiltaksadministrasjonUrl}/avtaler`} target="_blank">
								Avtaler
							</Link>
						</Dropdown.Menu.GroupedList.Item>

						<Dropdown.Menu.GroupedList.Item onClick={() => gjennomforingerLinkRef.current?.click()} as="span">
							<Link ref={gjennomforingerLinkRef} to={`${tiltaksadministrasjonUrl}/tiltaksgjennomforinger`} target="_blank">
								Tiltaksgjennomføringer
							</Link>
						</Dropdown.Menu.GroupedList.Item>

						<Dropdown.Menu.GroupedList.Item onClick={() => notifikasjonerLinkRef.current?.click()} as="span">
							<Link ref={notifikasjonerLinkRef} to={`${tiltaksadministrasjonUrl}/notifikasjoner`} target="_blank">
								Notifikasjoner
							</Link>
						</Dropdown.Menu.GroupedList.Item>

						<Dropdown.Menu.GroupedList.Item onClick={() => individuelleGjennomforingerLinkRef.current?.click()} as="span">
							<Link ref={individuelleGjennomforingerLinkRef} to={mulighetsrommetSanityUrl} target="_blank">
								Individuelle tiltaksgjennomføringer <ExternalLinkIcon />
							</Link>
						</Dropdown.Menu.GroupedList.Item>

						<Dropdown.Menu.GroupedList.Item onClick={() => veilederflateLinkRef.current?.click()} as="span">
							<Link ref={veilederflateLinkRef} to={navArbeidsmarkedstiltakUrl} target="_blank">
								Veilederflate forhåndsvisning <ExternalLinkIcon />
							</Link>
						</Dropdown.Menu.GroupedList.Item>

						<Dropdown.Menu.GroupedList.Item onClick={() => endringsmeldingerLinkRef.current?.click()} as="span">
							<Link ref={endringsmeldingerLinkRef} to="/">
								Endringsmeldinger
							</Link>
						</Dropdown.Menu.GroupedList.Item>
					</Dropdown.Menu.GroupedList>
				</Dropdown.Menu>
			</Dropdown>
			<InternalHeader.User name={innloggetAnsatt.navn} description={innloggetAnsatt.navIdent ?? '...'} className={styles.userBtn} />
		</InternalHeader>
	)
}
