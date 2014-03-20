'use strict';

angular.module('pivotapp.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Stores',
        'link': 'stores'
    }, {
        'title': 'Create New Store',
        'link': 'stores/create'
    }];

    $scope.isCollapsed = false;
}]);
