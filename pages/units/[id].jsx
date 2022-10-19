import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Container, Flex, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Profile from 'components/units/profile'
import Details from 'components/units/details'
import Overview from 'components/units/overview'

const Unit = () => {
	const router = useRouter()
	const { id } = router.query
	const { data: unit, isFetched: isUnitFetched } = useQuery(['unit', id], () => api.get('/units', id))

	if (!isUnitFetched) return null

	return (
		<Container>
			<Grid templateColumns="300px 1fr" alignItems="start" gap={6}>
				<GridItem display="grid" gap={6}>
					<Profile id={id} unit={unit} />
					<Details unit={unit} />
				</GridItem>

				<GridItem>
					<Tabs>
						<TabList justifyContent="space-between">
							<Flex>
								<Tab>Overview</Tab>
								<Tab>History</Tab>
								<Tab>Settings</Tab>
							</Flex>
						</TabList>

						<TabPanels>
							<TabPanel>
								<Overview id={id} unit={unit} />
							</TabPanel>

							<TabPanel></TabPanel>

							<TabPanel></TabPanel>
						</TabPanels>
					</Tabs>
				</GridItem>
			</Grid>
		</Container>
	)
}

Unit.authentication = {
	authorized: 'Admin'
}

export default Unit
