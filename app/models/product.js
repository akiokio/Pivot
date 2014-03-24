'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Categories = new Schema({
    name: String
}, { _id: false });

var Brand = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    }
}, { _id: false });

var Picture = new Schema({
    img: { data: Buffer, contentType: String }
}, { _id: false });

/**
 * Product Schema
 */
var ProductSchema = new Schema({
    _id: String,
    sku: {
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true
    },
    cost: Number,
    price: Number,
    brand: [Brand],
    status: Boolean,
    quantity: Number,
    gallery: [Picture],
    categories: [Categories],
    weight: {
        type: Number
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    depth: {
        type: Number
    },
    store: {
        type: Schema.ObjectId,
        ref: 'Store'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ProductSchema.path('name').validate(function(name) {
    return name.length;
}, 'name cannot be blank');

/**
 * Statics
 */
ProductSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Product', ProductSchema);
