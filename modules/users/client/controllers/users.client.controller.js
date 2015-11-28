angular.module('users.client.controller', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'users/client/views/login.html',
                controller: 'ctrlSign'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'users/client/views/register.html',
                controller: 'ctrlRegister'
            })

        $urlRouterProvider.otherwise('signin');
    }).factory('dataUser', function($http) {
        var dataUser = {};

        dataUser.usuarios = [];

        dataUser.usuario = {};

        dataUser.findUser = function(user){
            console.log(user);
            return $http.post('/login', user)
            // .success(function(user){
            //     console.log('aqi')
            // })
        }
        dataUser.register = function(user){
            console.log(user);
            return $http.post('/register', user)
            // .success(function(user){
            //     console.log('aqi')
            // })
        }

        return dataUser;

    })
    .controller('ctrlSign', function($scope, $state, dataUser) {
        $scope.usuario = {}

        $scope.findUser = function(){
            dataUser.findUser({
                username: $scope.usuario.user,
                password: $scope.usuario.password
            })
        }
    })
    .controller('ctrlRegister', function($scope, $state, dataUser) {
        $scope.usuario = {}

        $scope.registerUser = function(){
            dataUser.register({
                username: $scope.usuario.user,
                password: $scope.usuario.password
            })
        }
    })