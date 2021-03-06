'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    Brand = mongoose.model('Brand'),
    _ = require('lodash');


/**
 * Find product by id
 */
exports.product = function(req, res, next, id) {
    Product.load(id, function(err, product) {
        if (err) return next(err);
        if (!Product) return next(new Error('Failed to load product ' + id));
        req.product = product;
        next();
    });
};

/**
 * Create an product
 */
exports.create = function(req, res) {
    if (req.body.categories) {
        req.body.categories = JSON.parse(req.body.categories);
    }
    if(req.body.shipping){
        req.body.shipping = JSON.parse(req.body.shipping);
    }

    var product = new Product(req.body);
    product.user = req.user;

    product.save(function(err) {
        if (err) {
            console.log(err);
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Update an product
 */
exports.update = function(req, res) {
    var product = req.product;

    product = _.extend(product, req.body);

    product.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Delete an product
 */
exports.destroy = function(req, res) {
    var product = req.product;

    product.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Show an product
 */
exports.show = function(req, res) {
    res.jsonp(req.product);
};

/**
 * List of product
 */
exports.list = function(req, res) {
    req.query.user = req.user;
    Product.find(req.query).sort('-created').populate('user', 'name username').exec(function(err, products) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(products);
        }
    });
};

/**
 * List of brands
 */
exports.listBrands = function(req, res) {
    Brand.find(req.query).sort('-created').exec(function(err, brands) {
        if (err) {
            console.log(err);
            res.render('error', {
                status: 500,
                brand: brands,
            });
        } else {
            res.jsonp(brands);
        }
    });
};

/**
 * Create an brand
 */
exports.createBrand = function(req, res) {

    var brand = new Brand(req.body);

    brand.save(function(err) {
        if (err) {
            console.log(err);
            return res.send('users/signup', {
                errors: err.errors,
                product: brand
            });
        } else {
            res.jsonp(brand);
        }
    });
};
