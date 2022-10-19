import { signOut } from 'next-auth/react'
import { Button, Container, Flex, Text } from '@chakra-ui/react'

const Unauthorized = () => {
	return (
		<Container>
			<Flex justify="center" align="center">
				<Flex direction="column" gap={6}>
					<Text>Unauthorized</Text>
					<Button onClick={() => signOut()}>Log out</Button>
				</Flex>
			</Flex>
		</Container>
	)
}

export default Unauthorized
