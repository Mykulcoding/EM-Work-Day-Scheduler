// Wait for the DOM to be ready
$(document).ready(function() {
    // Get the current day using Day.js
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  
    // Display the current day in the #currentDay element
    $("#currentDay").text(currentDate);
  });