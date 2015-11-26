angular.module('users.client.controller', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'users/client/views/login.html',
                controller: 'ctrlSign'
            })

        $urlRouterProvider.otherwise('signin');
    })