import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { chakra, Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { BiBox, BiBriefcaseAlt2, BiCreditCard, BiEditAlt, BiGrid, BiHelpCircle, BiMessageSquareDetail, BiPieChart, BiUser, BiX } from 'react-icons/bi'
import { FiBox } from 'react-icons/fi'

const links = [
	{ pathname: 'dashboard', icon: BiPieChart },
	{ pathname: 'chats', icon: BiMessageSquareDetail },
	{ pathname: 'blogs', icon: BiEditAlt },
	{ pathname: 'units', icon: BiGrid },
	{ pathname: 'companies', icon: BiBriefcaseAlt2 },
	{ pathname: 'payments', icon: BiCreditCard },
	{ pathname: 'accounts', icon: BiUser },
	{ pathname: 'archive', icon: BiBox },
	{ pathname: 'support', icon: BiHelpCircle }
]

const Sidebar = ({ isOpen, onClose }) => {
	const router = useRouter()
	const { data: session } = useSession()

	return (
		<>
			<chakra.div bg="hsla(0, 0%, 0%, 0.4)" visibility={isOpen ? 'visible' : 'hidden'} position="fixed" top={0} left={0} h="100vh" w="full" opacity={isOpen ? 1 : 0} transition="0.4s ease-in-out" zIndex={99} onClick={onClose} />

			<chakra.aside bg="white" position="fixed" top={0} left={isOpen ? 0 : -256} h="100vh" w={256} transition="0.4s ease-in-out" zIndex={100} _dark={{ bg: 'surface' }}>
				<Flex justify="space-between" align="center" px={6} py={3} h="72px">
					<Icon as={FiBox} boxSize={6} color="accent-1" />
					<IconButton variant="ghost" mr={-3} icon={<BiX size={24} />} onClick={onClose} />
				</Flex>

				<Flex direction="column" p={3}>
					{links.map((data, index) => (
						<NextLink href={`/${data.pathname}`} passHref key={index}>
							<Flex as="a" bg={router.pathname.includes(data.pathname) ? 'canvas-1' : 'transparent'} justify="space-between" align="center" gap={6} borderRadius={12} px={3} h="44px" color={router.pathname.includes(data.pathname) ? 'accent-1' : 'accent-3'} transition=".4s" _hover={{ color: 'accent-1' }} onClick={onClose}>
								<Flex align="center" gap={3}>
									<Icon as={data.icon} boxSize={5} />

									<Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
										{data.pathname}
									</Text>
								</Flex>
							</Flex>
						</NextLink>
					))}
				</Flex>
			</chakra.aside>
		</>
	)
}

export default Sidebar
