app.directive('mainListItem', function(){
    return {
        restrict: 'E',
        templateUrl: '/html/partials/mainListItem.html'
    }
});


app.directive('addListItem', function(){
    return {
        restrict: 'E',
        templateUrl: '/html/partials/addListItem.html',
        scope:{
            btnText: '='
        }
    }
});