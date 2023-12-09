$(document).ready(function () {

  // Get the current date and format it as 'Day of the Week, Month Day'
  const todaysDate = dayjs().format("dddd, MMMM D");
  console.log(todaysDate);
  // Set the formatted date in the element with the ID 'currentDay'
  $("#currentDay").text(todaysDate);

  // Define an array containing business hours represented as objects with time and display properties
  const businessHours = [
    { time: '09', display: '9 AM' },
    { time: '10', display: '10 AM' },
    { time: '11', display: '11 AM' },
    { time: '12', display: '12 PM' },
    { time: '13', display: '1 PM' },
    { time: '14', display: '2 PM' },
    { time: '15', display: '3 PM' },
    { time: '16', display: '4 PM' },
    { time: '17', display: '5 PM' },
  ];

  function createTimeBlock(hourObj) {
    // Create a new row element with the 'time-block' class and set its ID
    const row = $('<div>').addClass('row time-block').attr('id', hourObj.time);
    // Create a column element for the hour and set its text content
    const hourCol = $('<div>').addClass('col-1 hour').text(hourObj.display);
    row.append(hourCol);
    // Create a column element for the hour and set its text content
    const textArea = $('<textarea>').addClass('col-10').attr('placeholder', 'Event or Task Description');
    row.append(textArea);
    // Create a button element for saving and set its title and text content
    const saveBtn = $('<button>').addClass('col-1 saveBtn').attr('title', 'Save').text('Save ').append('<i class="fas fa-save"></i>');
    // Append the row to the container element
    row.append(saveBtn);
    $('.container').append(row);

    const storedEvent = localStorage.getItem(hourObj.time);
    if (storedEvent) {
      textArea.val(storedEvent);
    }
    // Set up a click event listener for the save button to store the task/event in localStorage
    saveBtn.on('click', function () {
      const taskDescription = textArea.val();
      if (taskDescription !== '') {
        localStorage.setItem(hourObj.time, taskDescription);
        alert('Event saved!');
      } else {
        alert('Please enter an event before saving.');
      }
    });
  }
  // Loop through each hour object in the businessHours array and create time blocks
  businessHours.forEach(function (hour) {
    // Create a time block for each hour object
    createTimeBlock(hour);
  });

  function updateTimeBlockColors() {
    // Get the current hour in 24-hour format and convert it to an integer
    const currentHour = parseInt(dayjs().format('HH'), 10);

    // Iterate through each time block
    $('.time-block').each(function () {
      // Get the hour represented by the block and convert it to an integer
      const blockHour = parseInt($(this).attr('id'), 10);

      // Compare the block's hour with the current hour and apply appropriate classes and colors
      if (blockHour < currentHour) {
        $(this).removeClass('present future').addClass('past').css('background-color', 'lightgray');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present').css('background-color', 'tomato');
      } else {
        $(this).removeClass('past present').addClass('future').css('background-color', 'lightgreen');
      }
    });
  }
  // Call updateTimeBlockColors initially and then every 60 seconds (60000 milliseconds)
  updateTimeBlockColors();
  setInterval(updateTimeBlockColors, 60000);

  // Retrieve and display stored events on page load
  businessHours.forEach(function (hour) {
    // Retrieve the stored event/task description from localStorage for each hour
    const storedEvent = localStorage.getItem(hour.time);
    // If a stored event exists, set the value of the corresponding textarea
    if (storedEvent) {
      $(`#${hour.time} textarea`).val(storedEvent);
    }
  });
});