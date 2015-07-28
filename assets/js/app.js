            var app = angular.module("grh-admin", ["ngRoute", "ngResource"]);
                
                app.config(function ($routeProvider) {
                $routeProvider.when("/", {
                    templateUrl: "views/login.html",
                    title: "Authentification"
                });

                $routeProvider.when("/home", {
                    templateUrl: "views/home.html",
                    title: "Home"
                });
                $routeProvider.when("/people-directory", {
                    templateUrl: "views/directory.html",
                    title: "People directory"
                });     
                $routeProvider.when("/jobs-manager", {
                    templateUrl: "views/jobs.html",
                    title: "Jobs manager"
                });
                $routeProvider.when("/statistics", {
                    templateUrl: "views/statistics.html",
                    title: "Statistics"
                });                 

                $routeProvider.otherwise({
                    redirectTo: "/"
                });
            });

            app.run(['$rootScope', function($rootScope) {
                $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                    $rootScope.title = current.$$route.title;
                });
            }]);