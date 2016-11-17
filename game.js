/**
 * Created by BirenGrg on 11/9/2016.
 */

var game = {
    doc: $(document),
    body: $("body"),
    hero: null,
    villans: [],
    init: function () {
        var _game = this;
        this.track = $('<div class="game-track">').appendTo(this.body);
        var hero = this.hero = new Vehicle(this.track,"");
        var width = 300;
        var height = game.height = this.body.height();
        for(var count=0;count < 10; count++){
            var villan = this.villans[count]= new Vehicle(this.track,"villan");
            villan.x = Math.floor(Math.random()*5)*60+15;
            villan.y = Math.random()*height;
            villan.move();
        }

        this.body.addClass("game-body");

        this.doc.on('keydown', function (e) {
            switch (e.keyCode) {
                case 37 ://left
                    hero.updateCss("tl");
                    break;
                // case 38 ://top
                //     car.y -= 5;
                //     break;
                case 39 ://right
                    hero.updateCss("tr");
                    // hero.x += 5;
                    break;
                // case 40 ://bottom
                //     car.y += 5;
                //     break;
                default :
                    break;
            }
            // hero.move();
        });
        this.doc.on('keyup', function (e) {
            switch (e.keyCode) {
                case 37 ://left
                    hero.updateCss("t");
                    if (Math.floor( hero.x) < 60) {
                        break;
                    }
                    hero.x -= 60;
                    break;
                case 39 ://right
                    hero.updateCss("t");
                    if (Math.floor( hero.x) > width - 60) {
                        break;
                    }
                    hero.x += 60;
                    break;
                default :
                    break;
            }
            if (collidedVehicle.length>0) {
                collidedVehicle = [];
            }
            hero.move();

        });

        var backgroundSound = new audioController('road sound.mp3');
        backgroundSound.loop = true;
        backgroundSound.playAudio();
        var CarBeep = new audioController('car horn.mp3', 2.85);
        var collidedVehicle = [];

        this.timer = setInterval(function(){
            for(var count = 0;count < 10; count++){
                var villan = _game.villans[count];
                villan.y += 2;
                if (hero.collision(villan)) {
                    // villan.y -= 1;
                    // console.log("hero collided with villan[" + count + "]");
                    if (collidedVehicle.indexOf(count)==-1) {
                        collidedVehicle.push(count);
                    }
                }

                if (!collidedVehicle.indexOf('count')) {
                    // villan.y -= 2;
                }
                // collidedVehicle.forEach(function (item, index) {
                //     if (indexOf() ) {
                //         return;
                //     }elseif{
                //
                //     }
                //     villan.y -= 1;
                // });

                if(villan.y>_game.height + 60)
                    villan.y = Math.floor(Math.random() * _game.height - _game.height);

                if (count == 0) {
                    // console.log("x for villan : " + villan.x);
                    // console.log("y for villan : " + villan.y);
                }

                if (Math.abs(Math.floor(villan.x) - Math.floor(hero.x)) < 30) {//check if two vehicles are in the same lane
                    if (Math.abs(villan.y - hero.y) < 53) {
                        villan.y -= 2;
                        CarBeep.playAudio();
                    }
                }
                villan.move();
            }
            delete CarBeep;
        },25);
    }
};

function Vehicle(body, className) {
    this.x = 10;
    this.y = 10;

    this.element = $('<div class="game-car t">');
    body.append(this.element);

    this.element.addClass(className);

    this.x = this.element.position().left;
    this.y = this.element.position().top;

}

Vehicle.prototype.updateCss = function (className) {
    this.element.removeClass("t tl tr").addClass(className);
};
Vehicle.prototype.move = function () {
    this.element.css({left: this.x, top: this.y});
};
Vehicle.prototype.collision = function (car) {
        if (Math.abs(Math.floor(car.x) - Math.floor(this.x)) < 30) {//check if two vehicles are in the same lane
            if (Math.abs(car.y - this.y) < 53) {
                // console.log("collision occured");
                return true;
            }
        }
    return false;
};
function audioController(audio, startPos ) {
    this.isMute = false;
    this.audio = audio;
    _this = this;
    startPos = startPos == undefined ? 0 : startPos;
    this.playAudio = function () {
        var audio = new Audio(_this.audio);
        audio.play();
        audio.currentTime = startPos;
    };
    this.pauseAudio = function () {
        _this.audio.pause();
    };
}
game.init();

