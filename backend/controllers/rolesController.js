const { Roles } = require('../models/models');
const ApiError = require('../error/ApiError');

class RolesController {
	async create(req, res) {
		const { name } = req.body;

		const role = await Roles.create({ name });
		return res.json(role);
	}
	async getAll(req, res) {
		const roles = await Roles.findAll();
		return res.json(roles);
	}
	async delete(req, res) {
		const { id } = req.params;

		const types = await Roles.destroy({
			where: { id },
		});

		return res.json(true);
	}
	async update(req, res) {
		const { id } = req.params;
		const { name } = req.body;
		console.log(req);
		const options = { where: { id }, returning: true };
		const [count, role] = await Roles.update({ name }, options);

		return res.json(role);
	}
}

module.exports = new RolesController();
