import { useState } from 'react'
import NextLink from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Badge, Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight, BiDotsHorizontalRounded, BiSearch } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import Card from 'components/card'

const Payments = () => {
	const queryClient = useQueryClient()

	const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () => api.all('/accounts'))
	console.log(users)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		formState: { errors },
		setError,
		clearErrors,
		reset,
		handleSubmit
	} = useForm()

	const addUnitMutation = useMutation((data) => api.create('/units', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('units')
			reset()
			setIsLoading(false)
			onClose()
		},
		onError: (error) => {
			setError('number', { type: 'server', message: error.response.data })
			setIsLoading(false)
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)
		addUnitMutation.mutate({
			number: data.number,
			type: data.type,
			monthly_rent: data.monthly_rent
		})
	}

	return (
		<>
			<Container>
				<Grid templateColumns="1fr" gap={6}>
					<GridItem>
						<Flex justify="space-between" align="center" gap={6}>
							<Text fontSize="xl" fontWeight="semibold" color="accent-1">
								Payments
							</Text>

							<Button colorScheme="brand" onClick={() => clearErrors() || onOpen()}>
								Create
							</Button>
						</Flex>
					</GridItem>

					<GridItem>
						<Card>
							<Flex direction="column" gap={6}>
								<Flex justify="space-between" align="center" gap={6}>
									<Box w={256}>
										<InputGroup>
											<InputLeftElement pointerEvents="none">
												<BiSearch size={20} />
											</InputLeftElement>

											<Input placeholder="Search Units" />
										</InputGroup>
									</Box>

									<Box>
										<Select>
											<option>Occupied</option>
											<option>Vacant</option>
										</Select>
									</Box>
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

								<Flex justify="space-between" align="center" gap={6}>
									<Box>
										<Select>
											<option>10</option>
											<option>25</option>
											<option>50</option>
										</Select>
									</Box>

									<Flex gap={3}>
										<IconButton icon={<BiChevronLeft size={20} />} />
										<IconButton icon={<BiChevronRight size={20} />} />
									</Flex>
								</Flex>
							</Flex>
						</Card>
					</GridItem>
				</Grid>
			</Container>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader>Create Unit</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl isInvalid={errors.number}>
									<FormLabel>Unit Number</FormLabel>
									<Input type="number" {...register('number', { required: 'This field is required.' })} />
									<FormErrorMessage>{errors.number?.message}</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.type}>
									<FormLabel>Unit Type</FormLabel>

									<Select {...register('type', { required: true })}>
										<option value="single">Single</option>
										<option value="attached">Attached</option>
									</Select>

									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.monthly_rent}>
									<FormLabel>Monthly Rent</FormLabel>
									<Input type="number" {...register('monthly_rent', { required: true })} />
									<FormErrorMessage>This field is required.</FormErrorMessage>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter gap={3}>
							<Button type="submit" colorScheme="brand" isLoading={isLoading}>
								Submit
							</Button>

							<Button onClick={onClose}>Close</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

Payments.authentication = {
	authorized: 'Admin'
}

export default Payments
