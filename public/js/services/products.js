'use strict';

//Stores service used for articles REST endpoint
angular.module('pivotapp.products')
.factory('Products', ['$resource', function($resource) {
    return $resource('products/:productId', {
        productId: '@_id',
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
