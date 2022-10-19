import connect from 'database/connect'
import Soa from 'database/schemas/soa'
import Units from 'database/schemas/units'

export default async (req, res) => {
	const { method } = req
	await connect()

	switch (method) {
		case 'GET':
			try {
				const data = await Soa.find({}).sort({ createdAt: -1 })
				res.status(200).send(data)
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'POST':
			const { id, data } = req.body

			try {
				await Soa.create({
					...data,
					created: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
					updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
				})

				await Units.findByIdAndUpdate(
					{ _id: id },
					{
						schedule: {
							start_date: '',
							due_date: ''
						},
						camc: {
							amount: ''
						},
						water_bill: {
							current_reading: {
								value: '',
								date: ''
							},
							previous_reading: {
								value: '',
								date: ''
							}
						},
						maintenance: [],
						updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
					}
				)

				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'PATCH':
			try {
				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'DELETE':
			try {
				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		default:
			res.status(400).send('request failed.')
			break
	}
}
