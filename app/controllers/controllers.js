app.controller('HomeController', function($scope, $routeParams, getMuscleGroups, dbControl){
    dbControl.checkMuscleGroupsExist(function(success){
        if(success){
            dbControl.retrieveMuscles(function(muscles){
                $scope.muscles = muscles
            });
//            $scope.muscles = dbControl.retrieveMuscles()
        }
    });
    $scope.muscles = getMuscleGroups;

    $scope.addNewMuscle = function(){
        dbControl.addNewMuscle($scope.newMuscle.name);
        $scope.muscles.push({name: $scope.newMuscle.name})
    };

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
});




app.controller('MusclesController', function($scope, $routeParams, getExercises){
    $scope.exercises = getExercises;

    $scope.addNewExercise = function(){
        $scope.exercises.push({name: $scope.newExercise.name});
    }
});