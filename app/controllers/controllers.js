app.controller('HomeController', function($scope, $routeParams, getMuscleGroups, dbControl){

    $scope.muscles = getMuscleGroups;

    $scope.showNewRoutine = function(){
        $('.add-new-routine-form-container').slideToggle();
        $('.main-container').css('margin-bottom', '95px');
    };

    $scope.hideNewRoutine = function(){
        $('.add-new-routine-form-container').slideToggle(function(){
            $('.main-container').css('margin-bottom', '50px');
            $scope.newRoutine.name = '';
        });
    };

    $scope.addNewRoutine = function(){
        dbControl.addNewRoutine($scope.newRoutine.name);
        $scope.muscles.push({name: $scope.newRoutine.name});
        $scope.hideNewRoutine();
    };
});




app.controller('MusclesController', function($scope, $routeParams, getExercises){
    $scope.exercises = getExercises;

    $scope.addNewExercise = function(){
        $scope.exercises.push({name: $scope.newExercise.name});
    }
});