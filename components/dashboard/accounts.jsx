import { Avatar, Badge, Flex, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import Card from 'components/card'

const Accounts = () => {
	return (
		<Card>
			<Flex direction="column" gap={6}>
				<Flex justify="space-between" align="center" gap={6}>
					<Text fontSize="lg" fontWeight="semibold" color="accent-1">
						Accounts
					</Text>
				</Flex>

				<TableContainer>
					<Table>
						<Thead>
							<Tr>
								<Th textAlign="left">User</Th>
								<Th textAlign="center">Status</Th>
								<Th textAlign="right"></Th>
							</Tr>
						</Thead>

						<Tbody>
							{[...Array(5)].map((data, index) => (
								<Tr key={index}>
									<Td w={200} maxW={200} textAlign="left">
										<Flex align="center" gap={3}>
											<Avatar name="Company 1" />

											<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
												Tenant Name
											</Text>
										</Flex>
									</Td>

									<Td textAlign="center">
										<Badge variant="tinted" colorScheme="red">
											Unauthorized
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

export default Accounts
