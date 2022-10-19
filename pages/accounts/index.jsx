import { useState } from 'react'
import NextLink from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Badge, Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight, BiPencil, BiSearch } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import Card from 'components/card'

const Accounts = () => {
	const queryClient = useQueryClient()

	const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () => api.all('/accounts'))
	const { data: companies, isFetched: isCompaniesFetched } = useQuery(['companies'], () => api.all('/companies'))

	const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
	const [selected, setSelected] = useState()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		formState: { errors },
		setError,
		clearErrors,
		reset,
		handleSubmit
	} = useForm()

	const addUserMutation = useMutation((data) => api.create('/accounts', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('users')
			reset()
			setIsLoading(false)
			onClose()
		}
	})

	const editUserMutation = useMutation((data) => api.update('/accounts', selected.id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('users')
			setIsLoading(false)
			onEditClose()
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)
	}

	const editUser = (data) => {
		setIsLoading(true)

		editUserMutation.mutate({
			id: selected._id,
			data: data
		})
	}

	return (
		<>
			<Container>
				<Grid templateColumns="1fr" gap={6}>
					<GridItem>
						<Flex justify="space-between" align="center" gap={6}>
							<Text fontSize="xl" fontWeight="semibold" color="accent-1">
								Accounts
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
												<Th textAlign="left">Name</Th>
												<Th textAlign="left">Company</Th>
												<Th textAlign="center">Role</Th>
												<Th textAlign="center">Status</Th>
												<Th textAlign="center">Joined</Th>
												<Th textAlign="right"></Th>
											</Tr>
										</Thead>

										<Tbody>
											{isUsersFetched &&
												users.map((user) => (
													<Tr key={user._id}>
														<Td w={256} maxW={256} textAlign="left">
															<Flex align="center" gap={3}>
																<Avatar name={user.name} src={user.image} />

																<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
																	{user.name}
																</Text>
															</Flex>
														</Td>

														<Td w={256} maxW={256} textAlign="left">
															{isCompaniesFetched &&
																companies
																	.filter((company) => user.company.id === company._id)
																	.map((company) => (
																		<Flex align="center" gap={3} key={company._id}>
																			<Avatar name={company.name} />

																			<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
																				{company.name}
																			</Text>
																		</Flex>
																	))}
														</Td>

														<Td>
															<Flex justify="center">
																<Badge>{user.role}</Badge>
															</Flex>
														</Td>

														<Td>
															<Flex justify="center">
																<Badge variant="tinted" colorScheme={user.role === 'User' ? 'red' : 'blue'}>
																	{user.role === 'User' ? 'Unauthorized' : 'Authorized'}
																</Badge>
															</Flex>
														</Td>

														<Td>
															<Flex justify="center">
																<Text>{user.created}</Text>
															</Flex>
														</Td>

														<Td textAlign="right">
															<IconButton size="xs" icon={<BiPencil size={16} />} onClick={() => onEditOpen() || setSelected(user)} />
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
					<form>
						<ModalHeader>Create Accounts</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}></Flex>
						</ModalBody>

						<ModalFooter gap={3}>
							<Button colorScheme="brand" isLoading={isLoading}>
								Submit
							</Button>

							<Button onClick={onClose}>Close</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>

			<Modal isOpen={isEditOpen} onClose={onEditClose}>
				<ModalOverlay />

				<ModalContent>
					<form onSubmit={handleSubmit(editUser)}>
						<ModalHeader textAlign="center">{selected?.name}</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl>
									<FormLabel>Role</FormLabel>

									<Select disabled={selected?.role === 'Admin' ? true : false} {...register('role', { required: true })}>
										{selected && selected.role === 'Admin' ? (
											<option value="Admin">{selected.role}</option>
										) : (
											<>
												<option value={selected?.role}>{selected?.role}</option>
												<option value={selected?.role === 'User' ? 'Tenant' : 'User'}>{selected?.role === 'User' ? 'Tenant' : 'User'}</option>
											</>
										)}
									</Select>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter gap={3}>
							{selected?.role !== 'Admin' && (
								<Button type="submit" colorScheme="brand" isLoading={isLoading}>
									Submit
								</Button>
							)}

							<Button onClick={onEditClose}>Close</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

Accounts.authentication = {
	authorized: 'Admin'
}

export default Accounts
