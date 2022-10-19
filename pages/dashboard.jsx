import { Box, Button, Container, Flex, Grid, GridItem, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { BiCalendar } from 'react-icons/bi'
import Statistics from 'components/dashboard/statistics'
import Payments from 'components/dashboard/payments'
import Duedate from 'components/dashboard/duedate'
import Accounts from 'components/dashboard/accounts'

const Dashboard = () => {
	return (
		<Container>
			<Grid templateColumns="repeat(12, 1fr)" gap={6}>
				<GridItem colSpan={12}>
					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="xl" fontWeight="semibold" color="accent-1">
							Dashboard
						</Text>

						<Flex align="center" gap={3}>
							<Box w={164}>
								<InputGroup>
									<InputRightElement pointerEvents="none">
										<BiCalendar size={20} />
									</InputRightElement>

									<Input type="date" value="2022-08-30" readOnly />
								</InputGroup>
							</Box>

							<Button colorScheme="brand">Create</Button>
						</Flex>
					</Flex>
				</GridItem>

				<GridItem colSpan={12}>
					<Statistics />
				</GridItem>

				<GridItem colSpan={12}>
					<Payments />
				</GridItem>

				<GridItem colSpan={7}>
					<Duedate />
				</GridItem>

				<GridItem colSpan={5}>
					<Accounts />
				</GridItem>
			</Grid>
		</Container>
	)
}

Dashboard.authentication = {
	authorized: 'Admin'
}

export default Dashboard
