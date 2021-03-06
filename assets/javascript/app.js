$(document).ready(function () {

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

        var divArray = [
    $("#trainName"),
    $("#destination"),
    $("#firstTrainTime"),
    $("#frequency")
  ]


        if (trainName != "" && destination != "" && firstTrainTime != "" && frequency != "") {

            alert("Your Train has been added!");

            console.log(currentTime);
            database.ref().push({
                trainName: trainName,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency
            });

            for (i = 0; i < divArray.length; i++) {
                divArray[i].parent().css("color", "black");
            }
//clear field values after submit
            $("#trainName").val("");
            $("#destination").val("");
            $("#firstTrainName").val("");
            $("#frequency").val("");

            //error handling 
        } else {
            alert("You are missing data!");

            for (i = 0; i < divArray.length; i++) {
                if (divArray[i].val() == "") {
                    divArray[i].parent().css("color", "red");
                }
            }
        }
    });

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trnName = childSnapshot.val().trainName;
        var trnDestination = childSnapshot.val().destination;
        var fstTrnTime = childSnapshot.val().firstTrainTime;
        var trnFrequency = childSnapshot.val().frequency;


        // Prettify the train start
//        var trainTimePretty = moment.unix(fstTrnTime).format("HH:mm A");

//        console.log(trainTimePretty);
        

        var diffTime = moment().diff(moment(firstTrainTime), "minutes");


        //
        var tRemainder = diffTime % trnFrequency;


        //how many minutes till the next train
        var minutesTillTrain = trnFrequency - tRemainder;
        console.log(minutesTillTrain);


        var nextTrain = moment().add(minutesTillTrain, "HH:mm A");
        //Next train arrival
        var theNextTrain = moment(nextTrain).format("HH:mm A");


        //add information to the table

        $(".table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + trnFrequency + "</td><td>" + theNextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");

    })
})
