'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        if ( response.status != 200 ) {
          $scope.authError = 'Email or Password not right';
        }else{
            console.log(response);
            if(response.data.error){
                $scope.authError = '用户名或密码错误';
            }else{
                $scope.user = response.data.user;
                $state.go('app.dashboard-v1');
            }
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
;