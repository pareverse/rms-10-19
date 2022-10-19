import { Avatar, Flex, Text } from '@chakra-ui/react'
import Card from 'components/card'

const Profile = ({ company }) => {
	return (
		<Card>
			<Flex align="center" direction="column" gap={6} p={6}>
				<Avatar size="xl" name={company.name} />

				<Flex align="center" direction="column" textAlign="center">
					<Text fontWeight="semibold" textTransform="capitalize" color="accent-1" noOfLines={1}>
						{company.name}
					</Text>

					<Text fontSize="sm" noOfLines={1}>
						{company.email}
					</Text>
				</Flex>
			</Flex>
		</Card>
	)
}

export default Profile
