app.directive('mainListItem', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/partials/mainListItem.html'
    }
});


app.directive('addListItem', function(){
    return {
        restrict: 'E',
        templateUrl: 'app/views/partials/addListItem.html',
        scope:{
            btnText: '='
        }
    }
});