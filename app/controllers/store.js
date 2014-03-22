'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Store = mongoose.model('Store'),
    _ = require('lodash');


/**
 * Find store by id
 */
exports.store = function(req, res, next, id) {
    Store.load(id, function(err, store) {
        if (err) return next(err);
        if (!Store) return next(new Error('Failed to load store ' + id));
        req.store = store;
        next();
    });
};

/**
 * Create an store
 */
exports.create = function(req, res) {
    var store = new Store(req.body);
    store.user = req.user;

    store.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                store: store
            });
        } else {
            res.jsonp(store);
        }
    });
};

/**
 * Update an store
 */
exports.update = function(req, res) {
    var store = req.store;

    store = _.extend(store, req.body);

    store.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                store: store
            });
        } else {
            res.jsonp(store);
        }
    });
};

/**
 * Delete an store
 */
exports.destroy = function(req, res) {
    var store = req.store;

    store.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                store: store
            });
        } else {
            res.jsonp(store);
        }
    });
};

/**
 * Show an store
 */
exports.show = function(req, res) {
    res.jsonp(req.store);
};

/**
 * List of store
 */
exports.list = function(req, res) {
    req.query.user = req.user;
    Store.find(req.query).sort('-created').populate('user', 'name username').exec(function(err, stores) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(stores);
        }
    });
};
