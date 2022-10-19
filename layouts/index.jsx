import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { chakra, useDisclosure } from '@chakra-ui/react'
import Loading from 'components/loading'
import Unauthorized from 'components/unauthorized'
import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'

const AppLayout = (props) => {
	const router = useRouter()
	const { data: session, status } = useSession()
	const { isOpen, onOpen, onClose } = useDisclosure()

	if (status === 'loading') {
		return <Loading />
	} else {
		if (!session && props.authentication) {
			router.push('/')
			return <Loading />
		}

		if (session && session.user.role === 'User') {
			return <Unauthorized />
		}

		if (session && session.user.role === 'Admin' && router.pathname === '/') {
			router.push('/dashboard')
			return <Loading />
		}

		if (session && props.authentication && props.authentication.authorized) {
			if (session.user.role !== props.authentication.authorized) {
				return <Unauthorized />
			}
		}

		return (
			<>
				<Header onOpen={onOpen} />
				{session && session.user.role === 'Admin' && <Sidebar isOpen={isOpen} onClose={onClose} />}
				<chakra.main {...props} />
			</>
		)
	}
}

export default AppLayout
