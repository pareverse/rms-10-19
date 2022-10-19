import { mode } from '@chakra-ui/theme-tools'

const Popover = {
	baseStyle: (props) => ({
		content: {
			bg: mode('white', 'surface')(props),
			overflow: 'hidden',
			border: 'none',
			borderRadius: 12,
			boxShadow: mode('sm', 'dark-xl')(props)
		},
		header: {
			borderBottomWidth: 0,
			performance: 4,
			fontWeight: 'semibold',
			color: 'accent-1',
			px: 4,
			pt: 4,
			pb: 0
		},
		body: {
			p: 4
		},
		footer: {
			borderTopWidth: 0,
			px: 4,
			pt: 0,
			pb: 4
		}
	})
}

export default Popover
