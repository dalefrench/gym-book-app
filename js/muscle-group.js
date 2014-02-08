var muscleGroup = {

    muscle: '',

    init: function(){
        this.populateExerciseList();
    },

    populateExerciseList: function(){
        $.getJSON("data/"+this.muscle+".json", function(muscles) {
            var muscleListContainer = $('.js-exercise-list');
            for(muscle in muscles){
                muscleListContainer.append('<a href="" class="ui-btn" data-transition="flip" data-prefetch="true">'+muscles[muscle].name+'</a>');
            }
        });
    }
};

$(document).ready(function(){
    muscleGroup.init();
});