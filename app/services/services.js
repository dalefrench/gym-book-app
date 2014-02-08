app.service('musclesService', function () {

    this.getMuscleGroups = function (callback) {
        $.getJSON("data/muscle-group.json", function(muscles) {
            var newMuscles = [];
            for (muscle in muscles){
                newMuscles.push(muscles[muscle]);
            }
            // Turn to array to make it easier to add new exercises.
            callback(newMuscles);
        });
    };

    this.getMuscleExercises = function(muscle, callback){
        $.getJSON("data/"+muscle+"-exercises.json", function(exercises) {
            var newExercises = [];
                for (exercise in exercises){
                    newExercises.push(exercises[exercise]);
                }
            // Turn to array to make it easier to add new exercises.
            callback(newExercises);
        });
    }

});

app.service('dbControl', function(musclesService){
    var db = openDatabase('gymBook', '1.0', 'my first database', 2 *1024 * 1024);
    var $this = this;

    this.checkMuscleGroupsExist = function(callback){
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS muscle_groups (id unique, name)');
            tx.executeSql('SELECT * FROM muscle_groups', [], function (tx, results) {
                var len = results.rows.length;
                if(len < 1){
                    $this.addDefaultMuscleGroups();
                    callback(true)
                }else{
                    console.log('Has Records');
                    callback(true)
                }
            });
        });
    };

    this.addDefaultMuscleGroups = function(){
        musclesService.getMuscleGroups(function(muscles){
            db.transaction(function (tx) {
                for( muscle in muscles){
                    tx.executeSql('INSERT INTO muscle_groups (id, name) VALUES (?, ?)', [muscles[muscle].id, muscles[muscle].name]);
                }
            });
        })
    };

    this.retrieveMuscles = function(callback){
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM muscle_groups', [], function (tx, results) {
                var len = results.rows.length, i;
                var muscles = [];
                for (i = 0; i < len; i++) {
                    muscles.push({name: results.rows.item(i).name});
                }
                callback(muscles);
            });
        });
    };

    this.addNewMuscle = function(newMuscle){
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM muscle_groups', [], function (tx2, results) {
                var len = results.rows.length;

            });
            tx.executeSql('INSERT INTO muscle_groups (id, name) VALUES (?, ?)', 7, newMuscle);
        });
    }

});