import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Badge, Flex, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import Card from 'components/card'

const Soa = ({ company }) => {
	const { data: soa, isFetched: isSoaFetched } = useQuery(['soa'], () => api.all('/soa'))

	const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure()
	const [selected, setSelected] = useState()

	return (
		<>
			<Card>
				<Flex direction="column" gap={6}>
					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="lg" fontWeight="semibold" color="accent-1">
							Statement of Account
						</Text>
					</Flex>

					<TableContainer>
						<Table>
							<Thead>
								<Tr>
									<Th textAlign="left">SOA ID</Th>
									<Th textAlign="left">Start Date</Th>
									<Th textAlign="left">Due Date</Th>
									<Th textAlign="center">Total Amount</Th>
									<Th textAlign="center">Status</Th>
									<Th textAlign="right"></Th>
								</Tr>
							</Thead>

							<Tbody>
								{isSoaFetched &&
									soa
										.filter((soa) => company._id === soa.company.id)
										.map((soa) => (
											<Tr key={soa._id}>
												<Td>
													<Text>{soa._id}</Text>
												</Td>

												<Td>
													<Text>{soa.schedule.start_date}</Text>
												</Td>

												<Td>
													<Text>{soa.schedule.due_date}</Text>
												</Td>

												<Td>
													<Flex justify="center">
														<Text>₱ {Number(soa.total_amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
													</Flex>
												</Td>

												<Td>
													<Flex justify="center">
														<Badge variant="tinted" colorScheme="red">
															Un Paid
														</Badge>
													</Flex>
												</Td>

												<Td>
													<Flex justify="end">
														<IconButton size="xs" icon={<BiDotsHorizontalRounded size={16} />} onClick={() => onViewOpen() || setSelected(soa)} />
													</Flex>
												</Td>
											</Tr>
										))}
							</Tbody>
						</Table>
					</TableContainer>
				</Flex>
			</Card>

			<Modal isOpen={isViewOpen} onClose={onViewClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>{selected?._id}</ModalHeader>

					<ModalBody></ModalBody>

					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Soa
