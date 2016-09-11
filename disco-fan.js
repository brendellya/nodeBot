var five = require("johnny-five"),
    baseServo,
    fanServo,
    board,
    proximity,
    toggle;

var dist = 5;
var toggleCW =  100; //less cw
var toggleCCW = 950;


board = new five.Board();


board.on('ready', function(){
    //
    baseServo = new five.Servo.Continuous(9);
    fanServo = new five.Servo.Continuous(10);
    //
    toggle = new five.Sensor({
        pin: "A2",
        freq: 250,
        threshold: 5
    });
    proximity = new five.Proximity({
        controller: "HCSR04",
        pin: 7
    });


      board.repl.inject({
        pot: toggle,
        servo: baseServo
      });


  //   proximity.on("data", function() {
  //       console.log("Proximity: ");
  //       console.log("  cm  : ", this.cm);
  //       console.log("  in  : ", this.in);
  //       console.log("-----------------");
  //   });
  //

      proximity.on("change", function() {
        if(this.inches < dist){
            //start
            fanServo.cw();
        }else {
            // stop
            fanServo.stop();
        }
        console.log("The obstruction has moved.", this.in, this.cm);
      });


    toggle.on("change", function() {
        if(this.value <= toggleCW) {
            //baseServo.to(this.value);
            baseServo.cw();
            console.log("starting CW");

        }else if(this.value > toggleCW && this.value < toggleCCW) {
            baseServo.stop();
            console.log("stopping");
        }else{
            baseServo.ccw();
            console.log("starting cCW");
        }
        console.log(this.value, this.raw, this.scaleTo(0,1));
      });

    });


