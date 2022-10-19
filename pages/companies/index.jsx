import { useState } from 'react'
import NextLink from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, AvatarGroup, Badge, Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight, BiDotsHorizontalRounded, BiSearch } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import Card from 'components/card'

const Companies = () => {
	const queryClient = useQueryClient()
	const { data: companies, isFetched: isCompaniesFetched } = useQuery(['companies'], () => api.all('/companies'))
	const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () => api.all('/accounts'))
	const { data: units, isFetched: isUnitsFetched } = useQuery(['units'], () => api.all('/units'))
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

	const addUnitMutation = useMutation((data) => api.create('/companies', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('companies')
			reset()
			setIsLoading(false)
			onClose()
		}
	})

	const onSubmit = (data) => {
		if (!data.email.includes('@gmail.com')) {
			setError('email', { type: 'custom', message: 'Invalid email address.' })
			return
		}

		setIsLoading(true)
		addUnitMutation.mutate(data)
	}

	return (
		<>
			<Container>
				<Grid templateColumns="1fr" gap={6}>
					<GridItem>
						<Flex justify="space-between" align="center" gap={6}>
							<Text fontSize="xl" fontWeight="semibold" color="accent-1">
								Companies
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

											<Input placeholder="Search Company" />
										</InputGroup>
									</Box>

									<Box>
										<Select>
											<option></option>
											<option></option>
										</Select>
									</Box>
								</Flex>

								<TableContainer>
									<Table>
										<Thead>
											<Tr>
												<Th textAlign="left">Company</Th>
												<Th textAlign="center">Tenants</Th>
												<Th textAlign="center">Unit</Th>
												<Th textAlign="center">Created</Th>
												<Th textAlign="right"></Th>
											</Tr>
										</Thead>

										<Tbody>
											{isCompaniesFetched &&
												companies.map((company) => (
													<Tr key={company._id}>
														<Td w={256} maxW={256} textAlign="left">
															<Flex align="center" gap={3}>
																<Avatar name={company.name} />

																<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
																	{company.name}
																</Text>
															</Flex>
														</Td>

														<Td>
															<Flex justify="center">
																<AvatarGroup>{isUsersFetched && company.tenants.map((tenant) => users.filter((user) => user._id === tenant.id).map((user) => <Avatar name={user.name} src={user.image} key={user._id} />))}</AvatarGroup>
															</Flex>
														</Td>

														<Td>
															{company.unit.id ? (
																<Flex justify="center">{isUnitsFetched && units.filter((unit) => unit._id === company.unit.id).map((unit) => <Badge key={unit._id}>{unit.number}</Badge>)}</Flex>
															) : (
																<Flex justify="center">
																	<Skeleton borderRadius="full" h={2} w="48px" />
																</Flex>
															)}
														</Td>

														<Td textAlign="center">
															<Text>{company.created.split(',')[0]}</Text>
														</Td>

														<Td textAlign="right">
															<NextLink href={`/companies/${company._id}`} passHref>
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
						<ModalHeader>Create Company</ModalHeader>

						<ModalBody>
							<Flex direction="column" gap={6}>
								<FormControl isInvalid={errors.name}>
									<FormLabel>Name</FormLabel>
									<Input {...register('name', { required: 'This field is required.' })} />
									<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={errors.email}>
									<FormLabel>Email</FormLabel>
									<Input {...register('email', { required: 'This field is required.' })} />
									<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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

Companies.authentication = {
	authorized: 'Admin'
}

export default Companies
