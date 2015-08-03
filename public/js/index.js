/*var socket = io.connect('http://127.0.0.1:3000/')
socket.on('connected',function(){

})*/


angular.module('technodeApp',['ngRoute']);

/*
angular.module('technodeApp').config(function($routeProvider,$locationProvider){
    $locationProvider.html5Mode(true)
    $rootScopeProvider.when('/',{
        templateUrl:'/pages/room.html',
        controller:'RoomCtrl'
    }).when('/login',{
        templateUrl:'/pages/login.html',
        controller:'LoginCtrl'
    }).otherwise({
        redirectTo:'/login'
    })

})

angular.module('technodeApp',['ngRoute']).run(function($window,$rootScope,$http,$location){
    $http({
        url:'/api/validate',
        method:'GET'
    }).success(function(user){
        $rootScope.me = user
        $rootScope.path('/')
    }).error(function(data){
        $location.path('/login')
    });


    $rootScope.logout = function(){
        $http({
            url:'/ajax/logout',
            method:'GET'
        }).success(function(){
            $rootScope.me = null;
            $location.path('/login')
        })
    };

    $rootScope.$on('login',function(evt,me){
        $rootScope.me = me;
    })
})
*/






