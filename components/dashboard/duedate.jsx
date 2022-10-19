import { Avatar, Badge, Flex, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import Card from 'components/card'

const Duedate = () => {
	return (
		<Card>
			<Flex direction="column" gap={6}>
				<Flex justify="space-between" align="center" gap={6}>
					<Text fontSize="lg" fontWeight="semibold" color="accent-1">
						Due Date
					</Text>
				</Flex>

				<TableContainer>
					<Table>
						<Thead>
							<Tr>
								<Th textAlign="left">Company</Th>
								<Th textAlign="center">Unit</Th>
								<Th textAlign="center">Start Date</Th>
								<Th textAlign="center">End Date</Th>
								<Th textAlign="right"></Th>
							</Tr>
						</Thead>

						<Tbody>
							{[...Array(5)].map((data, index) => (
								<Tr key={index}>
									<Td w={200} maxW={200} textAlign="left">
										<Flex align="left" gap={3}>
											<Avatar name="Company 1" />

											<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
												Company Name
											</Text>
										</Flex>
									</Td>

									<Td textAlign="center">
										<Badge>110</Badge>
									</Td>

									<Td textAlign="center">
										<Text>09/30/2022</Text>
									</Td>

									<Td textAlign="center">
										<Text>09/30/2022</Text>
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

export default Duedate
