'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.signup = function() {
      $scope.authError = null;
      // Try to create
      $http.post('api/signup', {name: $scope.user.name, email: $scope.user.email,repassword:$scope.user.repassword, password: $scope.user.password})
      .then(function(response) {
              console.log(response)
        if ( response.status != 200 ) {
          $scope.authError = response;
        }else{
            console.log(response.data.status);
          $state.go('access.signin');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
 ;