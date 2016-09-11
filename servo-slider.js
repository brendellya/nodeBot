var five = require("johnny-five"),
  board, potentiometer, servo;

board = new five.Board();

board.on("ready", function() {
    servo = new five.Servo(10);

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A2",
    freq: 250,
    threshold: 5
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: potentiometer,
    servo: servo
  });

  // "data" get the current reading from the potentiometer
  potentiometer.on("change", function() {
    servo.to(this.value);
    console.log(this.value, this.raw, this.scaleTo(0,1));
  });
});
