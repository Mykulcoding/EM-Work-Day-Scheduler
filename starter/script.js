// Wait for the DOM to be ready
$(document).ready(function () {

  const todaysDate = dayjs().format("dddd, MMMM D");
  console.log(todaysDate);
  $("#currentDay").text(todaysDate);

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
    const row = $('<div>').addClass('row time-block').attr('id', hourObj.time);
    const hourCol = $('<div>').addClass('col-1 hour').text(hourObj.display);
    row.append(hourCol);
    const textArea = $('<textarea>').addClass('col-10').attr('placeholder', 'Event or Task Description');
    row.append(textArea);
    const saveBtn = $('<button>').addClass('col-1 saveBtn').attr('title', 'Save').text('Save ').append('<i class="fas fa-save"></i>');
    row.append(saveBtn);
    $('.container').append(row);

    const storedEvent = localStorage.getItem(hourObj.time);
    if (storedEvent) {
      textArea.val(storedEvent);
    }

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

  businessHours.forEach(function (hour) {
    createTimeBlock(hour);
  });

  function updateTimeBlockColors() {
    const currentHour = parseInt(dayjs().format('HH'), 10);

    $('.time-block').each(function () {
      const blockHour = parseInt($(this).attr('id'), 10);
      
      if (blockHour < currentHour) {
        $(this).removeClass('present future').addClass('past').css('background-color', 'lightgray');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present').css('background-color', 'tomato');
      } else {
        $(this).removeClass('past present').addClass('future').css('background-color', 'lightgreen');
      }
    });
  }

  updateTimeBlockColors();
  setInterval(updateTimeBlockColors, 60000);

  businessHours.forEach(function (hour) {
    const storedEvent = localStorage.getItem(hour.time);
    if (storedEvent) {
      $(`#${hour.time} textarea`).val(storedEvent);
    }
  });
});