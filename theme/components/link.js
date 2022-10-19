const Link = {
	baseStyle: (props) => ({
		fontSize: 'sm',
		fontWeight: 'semibold',
		color: props.active ? 'brand.default' : 'accent-1',
		transition: '.4s',
		_hover: {
			textDecoration: 'none',
			color: 'brand.default'
		}
	})
}

export default Link
