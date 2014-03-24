'use strict';

angular.module('pivotapp.products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Global', 'Products', 'Brands', function ($scope, $stateParams, $location, Global, Products, Brands) {
    $scope.global = Global;

    $scope.create = function() {
        var product = new Products({
            store: $stateParams.storeId,
			sku: this.sku,
            name: this.name,
            description: this.description
        });
        product.$save(function(response) {
            $location.path($stateParams.storeId + '/products/' + response._id);
        });

        this.name = '';
    };

    $scope.remove = function(product) {
        if (product) {
            product.$remove();

            for (var i in $scope.product) {
                if ($scope.product[i] === product) {
                    $scope.product.splice(i, 1);
                }
            }
        }
        else {
            $scope.product.$remove();
            $location.path('products');
        }
    };

    $scope.update = function() {
        var product = $scope.product;
        if (!product.updated) {
            product.updated = [];
        }
        product.updated.push(new Date().getTime());

        product.$update(function() {
            $location.path('products/' + product._id);
        });
    };

    $scope.find = function() {
        Products.query(function(stores) {
            $scope.stores = stores;
        });
    };

    $scope.findOne = function() {
        Products.get({
            productId: $stateParams.productId
        }, function(product) {
            $scope.product = product;
            // console.log(product);
            $scope.findBrands();
        });
    };

    $scope.findBrands = function() {
        Brands.query({store: $scope.product.store}, function(brands){
            $scope.brands = brands;
            console.log($scope.brands);
        });
    };

}]);
