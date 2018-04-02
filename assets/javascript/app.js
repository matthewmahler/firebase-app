var config = {
  apiKey: "AIzaSyAQZt7GTAlwLU_0rfWWzoGZtg1V2E77WKA",
  authDomain: "class-activities-da87e.firebaseapp.com",
  databaseURL: "https://class-activities-da87e.firebaseio.com",
  projectId: "class-activities-da87e",
  storageBucket: "class-activities-da87e.appspot.com",
  messagingSenderId: "14117380318"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainStart = moment($("#first-time").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    start: trainStart,
    frequency: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train added");

  // Clears all of the text-boxes
  $("#train-name").val('')
  $("#destination-input").val('')
  $("#first-time").val('');
  $("#frequency-input").val('')
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(trainStart);
  console.log(trainFreq);

  var trainStartPretty = moment.unix(trainStart).format("HH:mm");

  var trainNextArrival
  var trainMinutesAway

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  trainFreq + "</td><td>" + trainNextArrival + "</td><td>" + trainMinutesAway + "</td></tr>");
});


