import connect from 'database/connect'
import Companies from 'database/schemas/companies'
import Users from 'database/schemas/users'

export default async (req, res) => {
	const { method } = req
	await connect()

	switch (method) {
		case 'GET':
			try {
				const data = await Companies.find({}).sort({ createdAt: -1 })
				res.status(200).send(data)
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'POST':
			try {
				await Companies.create({
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
			console.log(req.body)

			try {
				if (data.tenants) {
					const company = await Companies.findById({ _id: id })

					if (data.tenants.remove) {
						company.tenants.splice(data.tenants.remove.index, 1)
					} else {
						company.tenants.push(data.tenants)
					}

					await company.save()

					await Users.findByIdAndUpdate(
						{ _id: data.tenants.id },
						{
							company: {
								id: id
							},
							updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
						}
					)
					return res.status(200).send('request success.')
				}

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
