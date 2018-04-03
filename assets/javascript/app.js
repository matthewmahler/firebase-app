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

$("#add-train").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#train-name").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainStart = moment($("#first-time").val().trim(), "HH:mm").format();
  var trainFreq = $("#frequency-input").val().trim()

  var newTrain = {
    name: trainName,
    destination: destination,
    start: trainStart,
    frequency: trainFreq
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  alert("Train added");

  $("#train-name").val('')
  $("#destination-input").val('')
  $("#first-time").val('');
  $("#frequency-input").val('')
});

var now = moment();

console.log(now);

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(destination);
  console.log(trainStart);
  console.log(trainFreq);
  console.log(now)





  var trainNextArrivalUnformated = moment(trainStart).diff(now);
  
  var trainNextArrival = Math.floor((((trainNextArrivalUnformated / 1000) / 60)));



  console.log(trainNextArrival);

  var trainArrivalTime = moment(trainStart).format("HH:mm");

  console.log(trainArrivalTime);


  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  "Every " + trainFreq + " Minutes" + "</td><td>" + trainArrivalTime + "</td><td>" + trainNextArrival + " Minutes" + "</td></tr>");
});
