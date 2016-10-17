// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDxkAsjSCEB4nliYTZLVsb7EKwdo7_pIwU",
    authDomain: "reservation-site-c3492.firebaseapp.com",
    databaseURL: "https://reservation-site-c3492.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "984900958777"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  if (!database) {
    console.log('Could not connect to firebase database.');
  }

$('#reservation-form').on('submit', function(e) {
  e.preventDefault();

  var nameInput = $('#name').val();
  var dayInput = $('#day').val();
  var timeInput = $('#time').val();

  var isValid = validateInput(nameInput, dayInput, timeInput);

  if (isValid) {
    //submit valid form data:
    //console.log('valid form input.');
    sendDataToServer(nameInput, dayInput, timeInput);
  }
});

function validateInput(nameInput, dayInput, timeInput) {

  var validateName = nameInput.search(/^[-'\w\s]+$/);

  if (validateName === 0) {
    $('#name').next().hide();
  }
  else {
      $('#name').next().show();
  }

  var validateDay = dayInput.search(/^\d{1,2}\/\d{1,2}\/\d{4}$/);

  if (validateDay === 0) {
    $('#day').next().hide();
  }
  else {
      $('#day').next().show();
  }

  var validateTime = timeInput.search(/^\d{1,2}\:\d{2}(AM|PM)$/);

  if (validateTime === 0) {
    $('#time').next().hide();
  }
  else {
      $('#time').next().show();
  }

  if (validateName === 0 && validateDay === 0 && validateTime === 0) {
    //submit form:
    return true;
  }

}

function sendDataToServer(nameInput, dayInput, timeInput) {

    var reservationsReference = database.ref('reservations');

    reservationsReference.push({
        name: nameInput,
        day: dayInput,
        time: timeInput
    });

    //Empty the inputs:
    $('#name, #day, #time').val('');

    retrieveDataFromServer();
}

function retrieveDataFromServer() {
    //Listen for changes in reservation data:
    database.ref('reservations').on('value', function (results) {

       //get all reservations data:
       var allReservations = results.val();

      //Create an array to store the reservations:
       var reservations = [];

       //Object using object literal notation.
       //This will be populated with user input:
       for (var reservation in allReservations) {

         var reservationData = {
            name: allReservations[reservation].name,
            day: allReservations[reservation].day,
            time: allReservations[reservation].time
         };

         //Get the HTML from the handlebars reservation template:
         var source = $('#reservations-template').html();

         //Compile the handlebars template:
         var template = Handlebars.compile(source);

         //Pass the data for this reservation into the template:
         reservationTableElement = template(reservationData);

         //Push the newly created reservation to the array of reservations:
         reservations.push(reservationTableElement);

         //Remove existing reservations in the UI and replace it with updated data:
         $('#reservations-data').empty();

         for (var i in reservations) {
            $('#reservations-data').append(reservations[i]);
         }

       }
    });

}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.8054491, lng: -73.9654415 },
    zoom: 16,

  });

  var marker = new google.maps.Marker({
      position: { lat: 40.8054491, lng: -73.9654415 },
      map: map,
      title: "Welcome to my house!"
  });

}

retrieveDataFromServer();
