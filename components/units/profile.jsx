import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Button, Divider, Flex, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Skeleton, SkeletonCircle, Text, useDisclosure } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import Card from 'components/card'

const Profile = ({ id, unit }) => {
	const queryClient = useQueryClient()

	const { data: companies, isFetched: isCompaniesFetched } = useQuery(['companies', unit.company.id], () => api.all('/companies'), { enabled: !unit.company.id ? true : false })
	const { data: company, isFetched: isCompanyFetched } = useQuery(['company', unit.company.id], () => api.get('/companies', unit.company.id), { enabled: unit.company.id ? true : false })

	const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen: isVerifyOpen, onOpen: onVerifyOpen, onClose: onVerifyClose } = useDisclosure()

	const [selected, setSelected] = useState()
	const [isLoading, setIsLoading] = useState(false)

	const EditUnitMutation = useMutation((data) => api.update('/units', id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('unit')
			onVerifyClose()
			setIsLoading(false)
		}
	})

	const addCompany = (id) => {
		setIsLoading(true)

		EditUnitMutation.mutate({
			unit: {
				id: unit._id
			},
			company: {
				id: id
			}
		})
	}

	return (
		<>
			<Card>
				<Flex align="center" direction="column" gap={6} p={6}>
					{isCompanyFetched && unit.company.id ? (
						<>
							<Avatar size="xl" name={company.name} />

							<Flex align="center" direction="column" textAlign="center">
								<Text fontWeight="semibold" color="accent-1" noOfLines={1}>
									{company.name}
								</Text>

								<Text fontSize="sm" noOfLines={1}>
									{company.email}
								</Text>
							</Flex>
						</>
					) : (
						<>
							<SkeletonCircle boxSize={24} />

							<Flex align="center" direction="column" gap={3}>
								<Skeleton borderRadius="full" h={3} w={148} />
								<Skeleton borderRadius="full" h={3} w={124} />
							</Flex>
						</>
					)}

					{!unit.company.id && (
						<Button variant="tinted" colorScheme="brand" onClick={onOpen}>
							Add Company
						</Button>
					)}
				</Flex>
			</Card>

			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Add Company</ModalHeader>

					<ModalBody>
						<Flex direction="column" gap={6}>
							<InputGroup>
								<InputLeftElement pt={1} pl={1}>
									<BiSearch size={20} />
								</InputLeftElement>

								<Input placeholder="Search Company" size="lg" />
							</InputGroup>

							<Divider />

							{isCompaniesFetched &&
								companies
									.filter((company) => !company.unit.id)
									.map((company) => (
										<Flex justify="space-between" align="center" gap={6} key={company._id}>
											<Flex align="center" gap={3}>
												<Avatar name={company.name} />

												<Text fontSize="sm" fontWeight="semibold" color="accent-1">
													{company.name}
												</Text>
											</Flex>

											<Button variant="tinted" size="sm" colorScheme="brand" onClick={() => onVerifyOpen() || onClose() || setSelected(company)}>
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
							<Avatar size="xl" name={selected?.name} />

							<Text fontSize="lg" fontWeight="semibold" color="accent-1">
								{selected?.name}
							</Text>

							<Text textAlign="center">
								Are you sure you want to add <br /> {selected?.name}?
							</Text>

							<Flex gap={3}>
								<Button colorScheme="brand" isLoading={isLoading} onClick={() => addCompany(selected._id)}>
									Yes, I&apos;m sure
								</Button>

								<Button onClick={() => onVerifyClose() || onOpen()}>No, Cancel</Button>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Profile
