$(() => {
  var socket = io.connect();
  console.log("client js loaded...");

  // listen to the "message" type message arriving
  socket.on('message', message => {
    console.log('The server has a message --> ' + message );
  })

  $('#addBuoyButton').click((e) => {
    const name = $('#buoyName').val();
    const lat = $('#latitude').val();
    const lon = $('#longitude').val();

    // collect Buoy data
    const addBuoyData = {
      'name': name,
      'lat': lat,
      'lon': lon
    }

    // emit Add Buoy data to server
    socket.emit('addBuoyData', addBuoyData);

    // clear form data
    $('#buoyName').val('');
    $('#latitude').val('');
    $('#longitude').val('');

    return false;
  })

  // Listen to Add Buoy response

});
