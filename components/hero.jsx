import { Button, Flex, Text } from '@chakra-ui/react'

const Hero = () => {
	return (
		<Flex gap={12} h={624}>
			<Flex flex={1} justify="start" align="center">
				<Flex direction="column" align="start" gap={6}>
					<Text fontSize={80} fontWeight="semibold" lineHeight={1} color="accent-1">
						Create your success business.
					</Text>

					<Text fontSize="lg">Starting a business can require a lot of work, time and money. Follow this guide to start your business plan off on the right foot.</Text>

					<Flex gap={3}>
						<Button size="xl" colorScheme="brand">
							Inquire Now
						</Button>

						<Button size="xl">Learn More</Button>
					</Flex>
				</Flex>
			</Flex>

			<Flex flex={1} justify="end" align="center">
				<Flex bgImage="url('/assets/hero.jpg')" bgSize="cover" bgPos="center" borderRadius="100px 0 100px 0" h="full" w="full" />
			</Flex>
		</Flex>
	)
}

export default Hero
