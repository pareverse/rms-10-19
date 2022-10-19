import { useState } from 'react'
import NextLink from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Badge, Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight, BiDotsHorizontalRounded, BiSearch } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import Card from 'components/card'

const Units = () => {
	const queryClient = useQueryClient()

	const { data: units, isFetched: isUnitFetched } = useQuery(['units'], () => api.all('/units'))
	const { data: companies, isFetched: isCompaniesFetched } = useQuery(['companies'], () => api.all('/companies'))

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
								Units
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
												<Th textAlign="center">Unit</Th>
												<Th textAlign="center">Type</Th>
												<Th textAlign="center">Rent</Th>
												<Th textAlign="center">Start Date</Th>
												<Th textAlign="center">Due Date</Th>
												<Th textAlign="center">Status</Th>
												<Th textAlign="right"></Th>
											</Tr>
										</Thead>

										<Tbody>
											{isUnitFetched &&
												isCompaniesFetched &&
												units.map((unit) => (
													<Tr key={unit._id}>
														<Td w={256} maxW={256} textAlign="left">
															{unit.company.id ? (
																companies
																	.filter((company) => unit.company.id === company._id)
																	.map((company) => (
																		<Flex align="center" gap={3} key={company._id}>
																			<Avatar name={company.name} />

																			<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
																				{company.name}
																			</Text>
																		</Flex>
																	))
															) : (
																<Skeleton borderRadius="full" h={2} w={200} />
															)}
														</Td>

														<Td textAlign="center">
															<Badge>{unit.number}</Badge>
														</Td>

														<Td textAlign="center">
															<Badge textTransform="capitalize">{unit.type}</Badge>
														</Td>

														<Td textAlign="center">
															<Text>₱{Number(unit.monthly_rent).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
														</Td>

														<Td textAlign="center">
															<Text>{unit.schedule.start_date ? unit.schedule.start_date : '-'}</Text>
														</Td>

														<Td textAlign="center">
															<Text>{unit.schedule.due_date ? unit.schedule.due_date : '-'}</Text>
														</Td>

														<Td textAlign="center">
															<Badge variant="tinted" colorScheme={unit.company.id ? 'blue' : 'red'}>
																{unit.company.id ? 'Occupied' : 'Vacant'}
															</Badge>
														</Td>

														<Td textAlign="right">
															<NextLink href={`/units/${unit._id}`} passHref>
																<IconButton as="a" size="xs" icon={<BiDotsHorizontalRounded size={16} />} />
															</NextLink>
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

Units.authentication = {
	authorized: 'Admin'
}

export default Units
