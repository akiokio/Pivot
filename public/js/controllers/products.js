'use strict';

angular.module('pivotapp.products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Global', 'Products', function ($scope, $stateParams, $location, Global, Products) {
    $scope.global = Global;

    $scope.findOne = function() {
        Products.get({
            productId: $stateParams.productId
        }, function(product) {
            $scope.product = product;
        });
    };
}]);
