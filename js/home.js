var home = {

    muscle: '',

    init: function(){
        this.populateMuscleList();

        // Log the results of the navigate event
        $( window ).on( "navigate", function( event, data ){


        // Hypothetical content alteration based on the url. E.g, make
        // an AJAX request for JSON data and render a template into the page.
        $.getJSON("data/chest-exercises.json", function(muscles) {
            var muscleListContainer = $('.js-exercise-list');
            for(muscle in muscles){
                muscleListContainer.append('<a href="" class="ui-btn" data-transition="flip" data-prefetch="true">'+muscles[muscle].name+'</a>');
            }
        });


        });
    },



    populateMuscleList: function(){
        $.getJSON("data/muscle-group.json", function(muscles) {
            var muscleListContainer = $('.js-muscle-list');
            for(muscle in muscles){
                muscleListContainer.append('<a href="" class="ui-btn  muscle-group-btn" data-transition="flip" data-prefetch="true">'+muscles[muscle].name+'</a>');
            }
            $( ".muscle-group-btn" ).on( "click", function( event ){

                // Prevent the usual navigation behavior
                event.preventDefault();

                // Alter the url according to the anchor's href attribute, and
                // store the data-foo attribute information with the url
                $.mobile.navigate( 'html/chest/chest.html', {
                    muscle: 'chest'
                });


            });
        });


    }
};

$(document).ready(function(){
    home.init();
    return home.pub
});