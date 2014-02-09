var app = angular.module('gymBook', ['ngRoute', 'ngTouch']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'HomeController',
            templateUrl: 'app/views/home.html',
            resolve :{
                getMuscleGroups:function($q, $route, $timeout, dbControl){
                    var deferred = $q.defer();

                    dbControl.checkMuscleGroupsExist(function(success){
                        if(success){
                            dbControl.retrieveMuscles(function(muscles){
                                deferred.resolve(muscles)
                            });
                        }
                    });

                    return deferred.promise;
                }
            }
        })
        //Define a route that has a route parameter in it (:customerID)
        .when('/muscle/:muscleName',
        {
            controller: 'MusclesController',
            templateUrl: 'app/views/muscles.html',
            resolve :{
                getExercises:function($q, $route, $timeout, musclesService){
                    var deferred = $q.defer();

                    musclesService.getMuscleExercises($route.current.params.muscleName, function(exersises){
                        deferred.resolve(exersises)
                    });

                    return deferred.promise;
                }
            }
        })
        //Define a route that has a route parameter in it (:customerID)
        .when('/settings',
        {
            controller: 'MusclesController',
            templateUrl: 'app/views/settings.html'
        })
        .otherwise({ redirectTo: '/' });
});
