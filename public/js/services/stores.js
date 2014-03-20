'use strict';

//Stores service used for articles REST endpoint
angular.module('pivotapp.stores').factory('Stores', ['$resource', function($resource) {
    return $resource('stores/:storeId', {
        storeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
