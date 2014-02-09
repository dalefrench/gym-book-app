app.service('routinesService', function () {

    this.getRoutines = function (callback) {
        $.getJSON("data/routines.json", function(routines) {
            var newRoutines = [];
            for (routine in routines){
                newRoutines.push(routines[routine]);
            }
            // Turn to array to make it easier to add new exercises.
            callback(newRoutines);
        });
    };

    this.getRoutineExercises = function(routine, callback){
        $.getJSON("data/"+routine+"-exercises.json", function(exercises) {
            var newExercises = [];
                for (exercise in exercises){
                    newExercises.push(exercises[exercise]);
                }
            // Turn to array to make it easier to add new exercises.
            callback(newExercises);
        });
    }

});

app.service('listControl', function(){

    this.showNewListItem = function(){
        $('.add-list-item-form-container').slideToggle();
        $('.main-container').css('margin-bottom', '95px');
    };

});

app.service('dbControl', function(routinesService){
    var db = openDatabase('gymBook', '1.0', 'Gym Book DB', 2 *1024 * 1024);
    var $this = this;

    this.checkRoutinesExist = function(callback){
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS routines (id, name)');
            tx.executeSql('SELECT * FROM routines', [], function (tx, results) {
                var len = results.rows.length;
                if(len < 1){
                    $this.addDefaultRoutines(function(){
                        callback(true)
                    });
                }else{
                    callback(true)
                }
            });
        });
    };

    this.addDefaultRoutines = function(callback){
        routinesService.getRoutines(function(routines){
            db.transaction(function (tx) {
                for( routine in routines){
                    tx.executeSql('INSERT INTO routines (id, name) VALUES (?, ?)', [routines[routine].id, routines[routine].name]);
                }
                callback(true)
            });
        })
    };

    this.retrieveRoutines = function(callback){
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM routines', [], function (tx, results) {
                var len = results.rows.length, i;
                var routines = [];
                for (i = 0; i < len; i++) {
                    routines.push({name: results.rows.item(i).name, id: results.rows.item(i).id});
                }
                callback(routines);
            });
        });
    };

    this.addNewRoutine = function(newRoutine){
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM routines', [], function (tx2, results) {
                tx.executeSql('INSERT INTO routines (id, name) VALUES (?, ?)', [results.rows.length+1, newRoutine]);
            });
        });
    };

    this.deleteRoutine = function(id){
        db.transaction(function (tx) {
            tx.executeSql('DELETE FROM routines WHERE id = ?', [id]);
        });
    };

});
