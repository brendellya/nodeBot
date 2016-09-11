var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` component
  // on a valid pwm pin
  var led11 = new five.Led(11);
  var led13 = new five.Led(13);

  // Instead of passing a time and rate, you can
  // pass any valid Animation() segment opts object
  // https://github.com/rwaldron/johnny-five/wiki/Animation#segment-properties
  led11.pulse({
    easing: "linear",
    duration: 3000,
    cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
    keyFrames: [0, 10, 0, 50, 0, 255],
    onstop: function() {
      console.log("Animation stopped");
    }
  });

    this.repl.inject({
    led: led13
  });

  led13.blink(1000);

  // Stop and turn off the led pulse loop after
  // 12 seconds (shown in ms)
  this.wait(12000, function() {
    // stop() terminates the interval
    // off() shuts the led off
    led11.stop().off();
  });
  
});
