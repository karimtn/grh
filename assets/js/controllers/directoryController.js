app.controller('directoryController', function($scope, $http, $location,Data) {
    
$scope.companies = [{"name":"Volvo","value":"volvo"},{"name":"Saab","value":"saab"},{"name":"Opel","value":"opel"},{"name":"Audi","value":"audi"}];
         $scope.showDepartement = function (company) {
             Data.get('department/'+company).then(function (results) {
                 	$scope.departments = results;
             });
         };
        
         $scope.showEmployee = function (department) {
            Data.get('employee/'+department).then(function (results) {
                  $scope.employees = results;
             });  
         };
});