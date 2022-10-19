import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Button, chakra, Flex, Icon, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { BiBell, BiLogOut, BiMenuAltLeft, BiMessageDetail, BiMoon, BiSun } from 'react-icons/bi'
import { FiBox } from 'react-icons/fi'

const Header = ({ onOpen }) => {
	const router = useRouter()
	const { data: session } = useSession()
	const { toggleColorMode } = useColorMode()
	const colorModeIcon = useColorModeValue(<BiMoon size={20} />, <BiSun size={20} />)

	return (
		<chakra.header bg="white" position="sticky" top={0} borderBottom="1px solid" borderColor="border" zIndex={99} _dark={{ bg: 'surface', border: 'none' }}>
			<Flex align="center" gap={6} mx="auto" px={6} h="72px" w="full" maxW={1280}>
				<Flex flex={1} justify="start" align="center">
					<Flex align="center" gap={3}>
						{session && session.user.role === 'Admin' && <IconButton icon={<BiMenuAltLeft size={20} />} onClick={onOpen} />}

						<NextLink href="/" passHref>
							<Flex as="a" display={{ base: 'none', md: 'flex' }} align="center" gap={2} color="accent-1">
								<Icon as={FiBox} boxSize={6} />

								<Text fontSize="lg" fontWeight="semibold">
									TSVJ CENTER
								</Text>
							</Flex>
						</NextLink>
					</Flex>
				</Flex>

				<Flex flex={1} justify="end" align="center">
					{session ? (
						<Flex align="center" gap={3}>
							<Flex align="center">
								<IconButton variant="ghost" icon={<BiMessageDetail size={20} />} />
								<IconButton variant="ghost" icon={<BiBell size={20} />} />
								<IconButton variant="ghost" icon={colorModeIcon} onClick={toggleColorMode} />
							</Flex>

							<Menu>
								<MenuButton>
									<Avatar name={session.user.name} src={session.user.image} outline="4px solid" outlineColor="canvas-1" />
								</MenuButton>

								<MenuList>
									<MenuItem icon={<BiLogOut size={20} />} onClick={() => signOut()}>
										Log out
									</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					) : (
						<Flex align="center" gap={6}>
							<Link active={1}>Home</Link>
							<Link>Blogs</Link>
							<Link>Services</Link>
							<Link>Company</Link>
							<Link>Contact Us</Link>

							<Button colorScheme="brand" onClick={() => signIn('google')}>
								Sign in
							</Button>
						</Flex>
					)}
				</Flex>
			</Flex>
		</chakra.header>
	)
}

export default Header
