import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Container, Flex, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Profile from 'components/company/profile'
import Tenants from 'components/company/tenants'
import Soa from 'components/company/soa'
import Payments from 'components/company/payments'

const Company = () => {
	const router = useRouter()
	const { id } = router.query

	const { data: company, isFetched: isCompanyFetched } = useQuery(['company', id], () => api.get('/companies', id))

	if (!isCompanyFetched) return null

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
}

Company.authentication = {
	authorized: 'Admin'
}

export default Company
