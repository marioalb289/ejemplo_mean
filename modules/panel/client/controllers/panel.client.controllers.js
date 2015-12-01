angular.module('panel.client.controller', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('alta', {
                url: '/alta',
                templateUrl: 'client/views/alta_proyecto.html',
                // controller: 'ctrlAlta'
            })
            .state('index', {
                url: '/index',
                templateUrl: 'client/views/index.html',
                // controller: 'ctrlAlta'
            })

        $urlRouterProvider.otherwise('index');
    })