var app = angular.module('gymBook', ['ngRoute', 'ngTouch']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'HomeController',
            templateUrl: 'app/views/home.html',
            resolve :{
                getRoutines:function($q, $route, $timeout, dbControl){
                    var deferred = $q.defer();

                    dbControl.checkRoutinesExist(function(success){
                        if(success){
                            dbControl.retrieveRoutines(function(routines){
                                deferred.resolve(routines)
                            });
                        }
                    });

                    return deferred.promise;
                }
            }
        })
        .when('/exercises/:routineName',
        {
            controller: 'ExerciseController',
            templateUrl: 'app/views/exercises.html',
            resolve :{
                getExercises:function($q, $route, $timeout, routinesService){

                    var deferred = $q.defer();

                    routinesService.getRoutineExercises($route.current.params.routineName, function(exersises){
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
