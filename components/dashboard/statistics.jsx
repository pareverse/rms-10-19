import { Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { FiCheckSquare, FiDollarSign, FiGrid, FiUsers } from 'react-icons/fi'
import Card from 'components/card'

const Statistics = () => {
	const data = [
		{ _id: 1, title: 'Vacant Units', value: 25, icon: FiCheckSquare },
		{ _id: 2, title: 'Total Units', value: 50, icon: FiGrid },
		{ _id: 3, title: 'Total Tenants', value: 25, icon: FiUsers },
		{ _id: 4, title: 'Total Collected', value: '₱80,000', icon: FiDollarSign }
	]

	return (
		<SimpleGrid columns={4} gap={6}>
			{data.map((data) => (
				<Card key={data._id}>
					<Flex gap={6}>
						<Flex flex={1}>
							<Flex direction="column" gap={2}>
								<Text fontSize="2xl" fontWeight="semibold" color="accent-1">
									{data.value}
								</Text>

								<Text fontSize="sm" fontWeight="medium">
									{data.title}
								</Text>
							</Flex>
						</Flex>

						<Flex>
							<Flex bg="brand.alpha" justify="center" align="center" borderRadius="full" h={14} w={14}>
								<Icon as={data.icon} boxSize={6} color="brand.default" />
							</Flex>
						</Flex>
					</Flex>
				</Card>
			))}
		</SimpleGrid>
	)
}

export default Statistics
