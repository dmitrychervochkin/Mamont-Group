const { Types } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypesController {
	async create(req, res) {
		const { name } = req.body;
		const type = await Types.create({ name });
		return res.json(type);
	}
	async getAll(req, res) {
		const types = await Types.findAll();
		return res.json(types);
	}
	async delete(req, res) {
		const { id } = req.params;

		const types = await Types.destroy({
			where: { id },
		});

		return res.json(true);
	}
	async update(req, res) {
		const { id } = req.params;
		const { name } = req.body;
		const options = { where: { id }, returning: true };
		const [count, type] = await Types.update({ name }, options);

		return res.json(type);
	}
}

module.exports = new TypesController();
