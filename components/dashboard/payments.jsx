import { Avatar, Badge, Flex, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import Card from 'components/card'

const Payments = () => {
	return (
		<Card>
			<Flex direction="column" gap={6}>
				<Flex justfy="space-between" align="center" gap={6}>
					<Text fontSize="lg" fontWeight="semibold" color="accent-1">
						Latest Payments
					</Text>
				</Flex>

				<TableContainer>
					<Table>
						<Thead>
							<Tr>
								<Th textAlign="left">Company</Th>
								<Th textAlign="left">Tenant</Th>
								<Th textAlign="center">Unit</Th>
								<Th textAlign="center">Amount</Th>
								<Th textAlign="center">Date</Th>
								<Th textAlign="center">Pay</Th>
								<Th textAlign="center">Status</Th>
								<Th textAlign="right"></Th>
							</Tr>
						</Thead>

						<Tbody>
							{[...Array(5)].map((data, index) => (
								<Tr key={index}>
									<Td w={256} maxW={256} textAlign="left">
										<Flex align="center" gap={3}>
											<Avatar name="Company 1" />

											<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
												Company Name
											</Text>
										</Flex>
									</Td>

									<Td textAlign="left">
										<Avatar name="Company 1" />
									</Td>

									<Td textAlign="center">
										<Badge>110</Badge>
									</Td>

									<Td textAlign="center">
										<Text>₱25,000</Text>
									</Td>

									<Td textAlign="center">
										<Text>09/30/2022</Text>
									</Td>

									<Td textAlign="center">
										<Badge variant="tinted" colorScheme="blue">
											GCash
										</Badge>
									</Td>

									<Td textAlign="center">
										<Badge variant="tinted" colorScheme="yellow">
											Pending
										</Badge>
									</Td>

									<Td textAlign="right">
										<IconButton size="xs" icon={<BiDotsHorizontalRounded size={16} />} />
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Flex>
		</Card>
	)
}

export default Payments
