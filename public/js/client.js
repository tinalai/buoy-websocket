$(() => {
  var socket = io.connect();
  console.log("client js loaded...");

  // listen to the "message" type message arriving
  socket.on('message', message => {
    alert('The server has a message --> ' + message );
  })

  $('#addBuoyButton').click(() => {
    // collect/create Add Buoy data (including Method name)

    // emit Add Buoy data to server

    // clear form data
  })

  // Listen to Add Buoy response

});

