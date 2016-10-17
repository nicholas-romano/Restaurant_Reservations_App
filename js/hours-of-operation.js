function checkIfOpen() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var day = weekday[d.getDay()];

    var time = d.getHours();

    switch(day) {
      case 'Monday':
      case 'Tuesday':
      case 'Wednesday':
      case 'Thursday':
      case 'Friday':
        if (time >= 6 && time < 21) {
          $('#open_or_closed').html("We Are Open!");
        }
        else {
          $('#open_or_closed').html("Sorry, We Are Closed");
        }
      break;
      case 'Sunday':
      case 'Saturday':
        if (time >= 8 && time < 18) {
          $('#open_or_closed').html("We Are Open!");
        }
        else {
          $('#open_or_closed').html("Sorry, We Are Closed");
        }
    }
}

checkIfOpen();
