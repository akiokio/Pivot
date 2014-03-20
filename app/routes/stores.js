'use strict';

// Stores routes use articles controller
var stores = require('../controllers/store');
var authorization = require('./middlewares/authorization');

// Stores authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.store.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/stores', stores.all);
    app.post('/stores', authorization.requiresLogin, stores.create);
    app.get('/stores/:storeId', stores.show);
    app.put('/stores/:storeId', authorization.requiresLogin, hasAuthorization, stores.update);
    app.del('/stores/:storeId', authorization.requiresLogin, hasAuthorization, stores.destroy);

    // Finish with setting up the articleId param
    app.param('storeId', stores.store);

};
