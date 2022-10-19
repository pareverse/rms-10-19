const Tabs = {
	variants: {
		default: {
			tab: {
				borderBottom: '2px solid',
				borderColor: 'transparent',
				px: 6,
				h: 10,
				fontWeight: 'medium',
				color: 'accent-4',
				transition: 'color .4s',
				_selected: {
					color: 'brand.default',
					borderColor: 'brand.default'
				}
			},
			tabpanel: {
				mt: 6,
				p: 0
			}
		}
	},
	defaultProps: {
		variant: 'default'
	}
}

export default Tabs
