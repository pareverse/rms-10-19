import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Container, Flex, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Hero from 'components/hero'
import Soa from 'components/company/soa'
import Payments from 'components/company/payments'
import Profile from 'components/company/profile'
import Tenants from 'components/company/tenants'

const Home = () => {
	const { data: session } = useSession()
	const { data: company, isFetched: isCompanyFetched } = useQuery(['company'], () => api.get('/companies', session.user.company.id))

	if (!isCompanyFetched) return null

	if (session && session.user.role === 'Tenant') {
		return (
			<Container>
				<Grid templateColumns="300px 1fr" alignItems="start" gap={6}>
					<GridItem display="grid" gap={6}>
						<Profile company={company} />
						<Tenants company={company} />
					</GridItem>

					<GridItem>
						<Tabs>
							<TabList justifyContent="space-between">
								<Flex>
									<Tab>Overview</Tab>
									<Tab>Settings</Tab>
								</Flex>
							</TabList>

							<TabPanels>
								<TabPanel>
									<Flex direction="column" gap={6}>
										<Soa company={company} />
										<Payments company={company} />
									</Flex>
								</TabPanel>

								<TabPanel></TabPanel>
							</TabPanels>
						</Tabs>
					</GridItem>
				</Grid>
			</Container>
		)
	} else {
		return (
			<Container>
				<Hero />
			</Container>
		)
	}
}

export default Home
