'use strict';

angular.module('pivotapp.stores').controller('StoresController', ['$scope', '$stateParams', '$location', 'Global', 'Stores', 'Products', function ($scope, $stateParams, $location, Global, Stores, Products) {
    $scope.global = Global;

    $scope.create = function() {
        var store = new Stores({
            name: this.name,
            url: this.url
        });
        store.$save(function(response) {
            $location.path('stores/' + response._id);
        });

        this.name = '';
        this.url = '';
    };

    $scope.remove = function(store) {
        if (store) {
            store.$remove();

            for (var i in $scope.stores) {
                if ($scope.stores[i] === store) {
                    $scope.store.splice(i, 1);
                }
            }
        }
        else {
            $scope.store.$remove();
            $location.path('stores');
        }
    };

    $scope.update = function() {
        var store = $scope.store;
        if (!store.updated) {
            store.updated = [];
        }
        store.updated.push(new Date().getTime());

        store.$update(function() {
            $location.path('stores/' + store._id);
        });
    };

    $scope.find = function() {
        Stores.query(function(stores) {
            $scope.stores = stores;
        });
    };

    $scope.findOne = function() {
        Stores.get({
            storeId: $stateParams.storeId
        }, function(store) {
            $scope.store = store;
        });
    };

    $scope.findStoreProducts = function(){
        Products.query({
            store: $stateParams.storeId
        }, function(products) {
            $scope.products = products;
        });
    };
}]);
