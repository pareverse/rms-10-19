import { useState } from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Button, Checkbox, Container, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, IconButton, Image, Input, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Radio, Select, SimpleGrid, Stack, Switch, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Textarea, Th, Thead, Tr, useColorMode, useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Card from 'components/card'
import Loading from 'components/loading'
import { Facebook, Google, Romadan, Telegram } from 'components/_logos'
import api from 'instance'
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi'
import { BiPencil } from 'react-icons/bi'
import axios from 'axios'

const Test = () => {
	const { toggleColorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [image, setImage] = useState()

	const handleOnChange = (e) => {
		const reader = new FileReader()

		reader.onload = function (e) {
			setImage(e.target.result)
		}

		reader.readAsDataURL(e.target.files[0])
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const form = e.currentTarget
		const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')

		const formData = new FormData()

		for (const file of fileInput.files) {
			formData.append('file', file)
		}

		formData.append('upload_preset', 'uploads')

		const data = await axios.post('https://api.cloudinary.com/v1_1/commence/image/upload', formData).then((res) => res.data)
		console.log(data)
	}

	return (
		<>
			<Container>
				<Card>
					<Stack gap={3}>
						<form onSubmit={handleSubmit}>
							<Flex direction="column" gap={6}>
								<Box position="relative">
									<Box position="absolute" top={-3}>
										<Input type="file" name="file" opacity={0} onChange={handleOnChange} />
									</Box>

									<Box bg="canvas-2" boxSize={148} borderRadius={12} overflow="hidden">
										{image && <Image boxSize={148} alt="" src={image} />}
									</Box>
								</Box>

								<Button type="submit">Upload File</Button>
							</Flex>
						</form>

						<Text fontSize="4xl" fontWeight="semibold" color="accent-1">
							Welcome to Next JS
						</Text>

						<Romadan h={32} w={24} />
						<Google size={96} />
						<Facebook />
						<Telegram />

						<Text color="accent-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita natus itaque ipsam doloremque aspernatur nisi molestias sequi maiores neque, est voluptate culpa nemo tenetur iste hic at magnam nam asperiores.</Text>

						<Text color="accent-4">Tristan Felizarta - 08/23/2000</Text>
						<Text color="accent-5">visit us on facebook</Text>

						<Box>
							<Button onClick={toggleColorMode}>Toggle Theme</Button>
						</Box>

						<Divider />

						<Stack direction="row" spacing={3}>
							<Button>Connect</Button>
							<Box>
								<Menu>
									<MenuButton as={Button} colorScheme="blue">
										Connect
									</MenuButton>

									<MenuList>
										<MenuItem icon={<FiUser size={16} />}>Profile</MenuItem>
										<MenuItem icon={<FiSettings size={16} />}>Settings</MenuItem>
										<MenuDivider />
										<MenuItem icon={<FiLogOut size={16} />}>Log out</MenuItem>
									</MenuList>
								</Menu>
							</Box>
							<Button colorScheme="red" onClick={onOpen}>
								Connect
							</Button>
							<Button colorScheme="green">Connect</Button>
							<Button colorScheme="yellow">Connect</Button>

							<Popover>
								<PopoverTrigger>
									<Button colorScheme="purple">Connect</Button>
								</PopoverTrigger>

								<PopoverContent>
									<PopoverHeader>Confirmation!</PopoverHeader>
									<PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
									<PopoverFooter>
										<Button>Close</Button>
									</PopoverFooter>
								</PopoverContent>
							</Popover>
						</Stack>

						<Divider />

						<Stack direction="row" spacing={6}>
							<Link active={1}>Home</Link>
							<Link>Products</Link>
							<Link>Blogs</Link>
							<Link>Services</Link>
							<Link>Contact Us</Link>
						</Stack>

						<Divider />

						<Tabs>
							<TabList>
								<Tab>Overview</Tab>
								<Tab>Settings</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>1</TabPanel>
								<TabPanel>2</TabPanel>
							</TabPanels>
						</Tabs>

						<Divider />

						<Accordion defaultIndex={[0]} allowMultiple>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Section 1 title
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</AccordionPanel>
							</AccordionItem>

							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Section 2 title
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</AccordionPanel>
							</AccordionItem>
						</Accordion>

						<Divider />

						<FormControl isRequired>
							<FormLabel>Unit Number</FormLabel>
							<Input size="lg" placeholder="Search Customers" variant="filled" />
							<FormHelperText>We dont share your username.</FormHelperText>
							<FormErrorMessage>Username is required.</FormErrorMessage>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Select Payments</FormLabel>
							<Select size="lg">
								<option>Payment Methods</option>
							</Select>
						</FormControl>

						<FormControl isRequired>
							<FormLabel size="lg">Message</FormLabel>

							<Textarea placeholder="Whats on your mind..."></Textarea>
						</FormControl>

						<Stack spacing={3}>
							<Checkbox>Accept terms and policy.</Checkbox>
						</Stack>

						<Box>
							<Stack spacing={3}>
								<Switch />
							</Stack>
						</Box>

						<Stack direction="row" spacing={3}>
							<Badge>Occupied</Badge>
							<Badge colorScheme="blue">Occupied</Badge>

							<Badge variant="tinted">Occupied</Badge>
							<Badge variant="tinted" colorScheme="blue">
								Occupied
							</Badge>
						</Stack>

						<Stack direction="row" spacing={3}>
							<Button colorScheme="brand">Sign in</Button>
							<Button>Close</Button>
						</Stack>

						<TableContainer>
							<Table>
								<Thead>
									<Tr>
										<Th>
											<Checkbox />
										</Th>
										<Th>Company</Th>
										<Th>Tenant</Th>
										<Th>Unit</Th>
										<Th>Amount</Th>
										<Th>Status</Th>
									</Tr>
								</Thead>

								<Tbody>
									{[...Array(5)].map((data, index) => (
										<Tr key={index}>
											<Td>
												<Checkbox />
											</Td>
											<Td>Company Name</Td>
											<Td>Tenant Name</Td>
											<Td>110</Td>
											<Td>P25,000</Td>
											<Td>Occupied</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</Stack>
				</Card>
			</Container>

			<Container py={6}>
				<SimpleGrid spacing={6}>
					<Card></Card>

					<Card></Card>

					<Card></Card>

					<Card></Card>
				</SimpleGrid>
			</Container>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Create User</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<Stack spacing={6}>
							<FormControl isRequired>
								<FormLabel>Unit Number</FormLabel>
								<Input size="lg" variant="filled" />
								<FormHelperText>We dont share your username.</FormHelperText>
								<FormErrorMessage>Username is required.</FormErrorMessage>
							</FormControl>

							<FormControl isRequired>
								<FormLabel>Select Payments</FormLabel>
								<Select size="lg">
									<option>Payment Methods</option>
								</Select>
							</FormControl>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue">Submit</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Test
