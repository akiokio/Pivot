'use strict';

// products routes use articles controller
var products = require('../controllers/product');
var authorization = require('./middlewares/authorization');

// products authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.product.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};
//User Belongs to store
var belongsToSameStore = function(req, res, next){
    // console.log(req, res, next);
    next();
};

module.exports = function(app) {

    app.get('/products', products.list);
    app.post('/products', authorization.requiresLogin, products.create);
    app.get('/products/:productId', products.show);
    app.put('/products/:productId', authorization.requiresLogin, hasAuthorization, products.update);
    app.del('/products/:productId', authorization.requiresLogin, hasAuthorization, products.destroy);

    app.get('/brands', products.listBrands);
    app.post('/brands', authorization.requiresLogin, belongsToSameStore, products.createBrand);

    // Finish with setting up the articleId param
    app.param('productId', products.product);

};
