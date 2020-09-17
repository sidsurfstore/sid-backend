const connection = require('../../../database/connection');

module.exports = async (req, res, next) => {
    const { store_id } = req.params;
    const { user_admin } = req.headers;

    if (!user_admin) return res.status(401).json('admin does not information');

    if (store_id == 0 || !store_id || !store_id.length) {
        return res.status(401).json('please, put id store');
    }

    const user = await connection('users')
        .select('*')
        .where('id', user_admin);

    if (!user.length) {
        return res.status(401).json('user does not exist');
    }

    if (!user[0].permission.includes('admin')) {
        return res.status(401).json('admin not authorization');
    }

    const store = await connection('stores')
        .select('*')
        .where('id', store_id);

    if (!store.length) {
        return res.status(401).json('store does not exist');
    }

    if (user[0].store_id.toString() !== store_id) {
        return res.status(401).json('store admin not authorization');
    }

    return next();
};
