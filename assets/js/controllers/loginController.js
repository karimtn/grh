app.constant('authUrl', 'http://127.0.0.1/epreuve/test/source/api/auth')
    .controller('AuthController', function($scope, $http, $location, authUrl,Data) {
        
        $scope.doLogin = function (customer) {
            Data.post('auth', {
                customer: customer
            }).then(function (results) {
                if(results.status == "error") {
                    $scope.authenticationError = results;
                }
                else if (results.status == "success") {
                    $scope.username = results.name;
                    $location.path('/people-directory');
                }
            });
        };
        
    });