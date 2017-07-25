$(document).ready(function () {

    //the variables
    //    var trainName;
    //    var destination;
    //    var firstTrain;
    //    var frequency;
    var currentTime = moment();

    //Firbase initializer for the database
    var config = {
        apiKey: "AIzaSyCtvA-suLMCZUswH0HI2saclXE7bQquBAI",
        authDomain: "tuesdayclass1-990c4.firebaseapp.com",
        databaseURL: "https://tuesdayclass1-990c4.firebaseio.com",
        projectId: "tuesdayclass1-990c4",
        storageBucket: "tuesdayclass1-990c4.appspot.com",
        messagingSenderId: "808216081778"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    //setting up the clock
    setInterval(function () {
        $(".current-time").html(moment().format('hh:mm:ss A'))
    }, 1000);


    //on click event function to submit the form information
    $(".submit").on("click", function (event) {

        // Don't refresh the page!
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        //takes the input val from #firstTrainTime parses it out as HH:mm and then formats it as a unix time stamp
        var firstTrainTime = moment($("#firstTrainTime").val().trim(), "HH:mm A").format("X");
        var frequency = $("#frequency").val().trim();
        console.log(firstTrainTime);

        currentTime = moment().format("X");

        console.log(currentTime);
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        });
        // Logs everything to console
        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);

        //alert try change to modal
//        alert("Train Added to Schedule.");

        //Clear form fields
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrainTime").val("");
        $("#frequency").val("");

    });

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trnName = childSnapshot.val().trainName;
        var trnDestination = childSnapshot.val().destination;
        var fstTrnTime = childSnapshot.val().firstTrainTime;
        var trnFrequency = childSnapshot.val().frequency;

        // Train Info
        console.log(trnName);
        console.log(trnDestination);
        console.log(fstTrnTime);
        console.log(trnFrequency);

        // Prettify the train start
        var trainTimePretty = moment.unix(fstTrnTime).format("HH:mm A");

        console.log(trainTimePretty);

        var diffTime = moment().diff(moment(firstTrainTime), "minutes");
        
//        console.log(diffTime);
        
        var tRemainder = diffTime % trnFrequency;
//        console.log(trnFrequency);
//        console.log(tRemainder);
        
        var minutesTillTrain = trnFrequency - tRemainder;
        console.log(minutesTillTrain);
        
    
        var nextTrain = moment().add(minutesTillTrain, "minutes");
        console.log(moment(nextTrain).format("HH:mm A"));
        
        
        //add information to the table
        
        $(".table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + trnFrequency + "</td><td>" + trainTimePretty + "</td><td>" + minutesTillTrain + "</td></tr>");
        
        
    })
})
