import connect from 'database/connect'
import Units from 'database/schemas/units'
import Companies from 'database/schemas/companies'

export default async (req, res) => {
	const { method } = req
	await connect()

	switch (method) {
		case 'GET':
			try {
				const data = await Units.find({}).sort({ createdAt: -1 })
				res.status(200).send(data)
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'POST':
			try {
				const search = await Units.findOne({ number: req.body.number })

				if (search) return res.status(417).send('Unit number is already exists.')

				await Units.create({
					...req.body,
					created: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
					updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
				})
				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'PATCH':
			const { id, data } = req.body

			try {
				if (req.body.unit && req.body.company) {
					const { unit, company } = req.body

					await Units.findByIdAndUpdate(
						{ _id: id },
						{
							company,
							updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
						}
					)

					await Companies.findByIdAndUpdate(
						{ _id: company.id },
						{
							unit,
							updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
						}
					)
					return res.status(200).send('request success.')
				}

				if (data.maintenance) {
					const unit = await Units.findById({ _id: id })

					if (data.maintenance.remove) {
						unit.maintenance.splice(data.maintenance.remove.index, 1)
					} else {
						unit.maintenance.push(data.maintenance)
					}

					await unit.save()
					return res.status(200).send('request success.')
				}

				await Units.findByIdAndUpdate(
					{ _id: id },
					{
						...data,
						updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
					}
				)
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
