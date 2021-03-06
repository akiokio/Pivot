'use strict';

//Setting up route
angular.module('pivotapp').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all articles', {
        url: '/articles',
        templateUrl: 'views/articles/list.html'
    })
      .state('create article', {
        url: '/articles/create',
        templateUrl: 'views/articles/create.html'
    })
      .state('edit article', {
        url: '/articles/:articleId/edit',
        templateUrl: 'views/articles/edit.html'
    })
      .state('article by id', {
        url: '/articles/:articleId',
        templateUrl: 'views/articles/view.html'
    })
    // store crud
      .state('all stores', {
        url: '/stores',
        templateUrl: 'views/stores/list.html'
    })
      .state('create store', {
        url: '/stores/create',
        templateUrl: 'views/stores/create.html'
    })
      .state('edit store', {
        url: '/stores/:storeId/edit',
        templateUrl: 'views/stores/edit.html'
    })
      .state('store by id', {
        url: '/stores/:storeId',
        templateUrl: 'views/stores/view.html'
    })
    // Product crud
      .state('all products', {
        url: '/:storeId//products',
        templateUrl: 'views/products/list.html'
    })
      .state('create products', {
        url: '/:storeId/products/create',
        templateUrl: 'views/products/create.html'
    })
      .state('edit products', {
        url: '/:storeId/products/:productId/edit',
        templateUrl: 'views/products/edit.html'
    })
      .state('products by id', {
        url: '/:storeId/products/:productId',
        templateUrl: 'views/products/view.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('pivotapp').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
