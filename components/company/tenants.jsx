import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Button, Divider, Flex, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import Card from 'components/card'
import { BiPencil, BiSearch } from 'react-icons/bi'

const Tenants = ({ company }) => {
	const { data: session } = useSession()
	const queryClient = useQueryClient()
	const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () => api.all('/accounts'))
	const { isOpen: isUsersOpen, onOpen: onUsersOpen, onClose: onUsersClose } = useDisclosure()
	const { isOpen: isVerifyOpen, onOpen: onVerifyOpen, onClose: onVerifyClose } = useDisclosure()
	const [selected, setSelected] = useState()
	const [isLoading, setIsLoading] = useState(false)

	const EditTenantMutation = useMutation((data) => api.update('/companies', company._id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('company')
			onVerifyClose()
			setIsLoading(false)
		}
	})

	const addTenant = (id) => {
		setIsLoading(true)

		EditTenantMutation.mutate({
			id: company._id,
			data: {
				tenants: {
					id: id
				}
			}
		})
	}

	return (
		<>
			<Card>
				<Flex direction="column" gap={6}>
					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="lg" fontWeight="semibold" color="accent-1">
							Tenants
						</Text>

						{session.user.role === 'Admin' && <IconButton variant="tinted" size="sm" colorScheme="brand" icon={<BiPencil size={16} />} onClick={onUsersOpen} />}
					</Flex>

					<Divider />

					{isUsersFetched &&
						users
							.filter((user) => user.company.id)
							.map((user) => (
								<Flex justify="space-between" align="center" gap={6} key={user._id}>
									<Flex align="center" gap={3}>
										<Avatar name={user.name} src={user.image} />

										<Text fontSize="sm" fontWeight="semibold" color="accent-1">
											{user.name}
										</Text>
									</Flex>
								</Flex>
							))}
				</Flex>
			</Card>

			<Modal blockScrollOnMount={false} isOpen={isUsersOpen} onClose={onUsersClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Add Tenant</ModalHeader>

					<ModalBody>
						<Flex direction="column" gap={6}>
							<InputGroup>
								<InputLeftElement pt={1} pl={1}>
									<BiSearch size={20} />
								</InputLeftElement>

								<Input placeholder="Search Tenant" size="lg" />
							</InputGroup>

							<Divider />

							{isUsersFetched &&
								users
									.filter((user) => user.role !== 'Admin' && !user.company.id)
									.map((user) => (
										<Flex justify="space-between" align="center" gap={6} key={user._id}>
											<Flex align="center" gap={3}>
												<Avatar name={user.name} src={user.image} />

												<Text fontSize="sm" fontWeight="semibold" color="accent-1">
													{user.name}
												</Text>
											</Flex>

											<Button variant="tinted" size="sm" colorScheme="brand" onClick={() => onVerifyOpen() || onUsersClose() || setSelected(user)}>
												Add
											</Button>
										</Flex>
									))}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Modal size="sm" blockScrollOnMount={false} isOpen={isVerifyOpen} onClose={onVerifyClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalBody>
						<Flex align="center" direction="column" gap={6} p={6}>
							<Avatar size="xl" name={selected?.name} src={selected?.image} />

							<Text fontSize="lg" fontWeight="semibold" color="accent-1">
								{selected?.name}
							</Text>

							<Text textAlign="center">
								Are you sure you want to add <br /> {selected?.name}?
							</Text>

							<Flex gap={3}>
								<Button colorScheme="brand" isLoading={isLoading} onClick={() => addTenant(selected._id)}>
									Yes, I&apos;m sure
								</Button>

								<Button onClick={() => onVerifyClose() || onUsersOpen()}>No, Cancel</Button>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Tenants
