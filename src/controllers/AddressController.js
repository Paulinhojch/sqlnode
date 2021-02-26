const Address = require('../model/Address');
const User = require('../model/User');
const { index } = require('./UserController');

module.exports = {

    async index(req, res){
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        const addresses = await Address.findAll({ where: {user_id}})

        return res.json(addresses);
    },



    async store(req, res){
        const { user_id } = req.params;
        const { zipcode, street, number } = req.body;

        const user = await User.findByPk(user_id);

        if(!user){
           return res.status(400).json({ error: 'User not found' }); 
        }

        const address = await Address.create({ 
            zipcode,
            street,
            number,
            user_id,
        });
        return res.json(address);
    }
};