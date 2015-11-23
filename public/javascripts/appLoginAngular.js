angular.module('appLogin', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'views/login/signin.html',
                // controller: 'ctrlSignin'
            })
        $urlRouterProvider.otherwise('signin');
    })