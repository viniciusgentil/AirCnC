const User = require('../models/User');

// Opções
// index: listagem de registro
// show: registro especifico
// store: criação de registro
// destroy: exclusão de registro

module.exports = {
    async store(req, res) {
        
        const {email} = req.body;

        let user = await User.findOne({ email });

        if(!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};

 