app.controller('HomeController', function($scope, $routeParams, getRoutines, dbControl, listControl){

    $scope.routines     = getRoutines;
    $scope.newRoutine   = {name: ''};
    $scope.nextLevel    = 'exercises';
    $scope.exerciseText = 'Add New Routine';

    $scope.showNewListItem = function(){
        listControl.showNewListItem();
    };

    $scope.hideNewListItem  = function(){
        $('.add-list-item-form-container').slideToggle(function(){
            $('.main-container').css('margin-bottom', '50px');
            $scope.newRoutine.name = '';
        });
    };

    $scope.addNewRoutine = function(){
        dbControl.addNewRoutine($scope.newRoutine.name);
        $scope.routines.push({name: $scope.newRoutine.name});
        $scope.hideNewRoutine();
    };

    $scope.deleteListItem = function(event, id){
        var row = $(event.srcElement).parents('.routine-row');
        row.slideToggle(function(){
            row.remove();
        });

        dbControl.deleteRoutine(id);
    }
});




app.controller('ExerciseController', function($scope, $routeParams, getExercises){
    $scope.exercises    = getExercises;
    $scope.nextLevel    = 'exerciseDetail';
    $scope.exerciseText = 'Add New Exercise';

    $scope.addNewExercise = function(){
        $scope.exercises.push({name: $scope.newExercise.name});
    };

    $scope.back = function(){
        window.location='#back';
    }
});