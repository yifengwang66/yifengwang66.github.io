var game = {
    birdTimer: null,
    createPipeTimer: null,
    backgroundTimer: null,
    score: 0,
    pipeList: [],
    init: function () {
        this.initData();
        this.startAnimation();
    },
    initData: function () {
        this.background = document.getElementById('background');
        this.startButton = document.getElementById('startButton');
        this.Bird = document.getElementsByClassName('startBird')[0];
        this.scorePlant = document.getElementById('score');
    },
    startAnimation: function () {
        var self = this;
        var birdTimer = null;
        var textTimer = null;
        var button = this.startButton;
        var birdSpeed = 2;
        var textSpeed = 1;
        var startBirdTop = parseInt(window.getComputedStyle(this.Bird, null)['top']);
        birdTimer = setInterval(function () {
            if (self.Bird.offsetTop - startBirdTop >= 20 || self.Bird.offsetTop - startBirdTop + birdSpeed <= 0) {
                birdSpeed *= -1;
            }
            self.Bird.style.top = self.Bird.offsetTop + birdSpeed + 'px';
        }, 50);
        textTimer = setInterval(function () {
            var fontSize = parseInt(window.getComputedStyle(self.startButton, null)['fontSize']);
            if (fontSize === 20 || fontSize === 12) {
                textSpeed *= -1;
            }
            button.style.fontSize = fontSize + textSpeed + 'px';
        }, 50)
        button.addEventListener('click', function (e) {
            clearInterval(birdTimer);
            clearInterval(textTimer);
            button.style.display = 'none';
            self.Bird.className = 'playingBird';
            self.startGame();
            self.renderScore();
            e.stopPropagation();
        }, false)
    },
    renderScore: function () {
        this.scorePlant.innerText = this.score;
    },
    addScore: function () {
        this.score++;
        this.renderScore();
    },
    startGame: function () {
        this.birdMove();
        this.startCreate();
        this.backgroundMove();
    },
    birdMove: function () {
        var self = this;
        this.setBirdInterval();
        this.Bird.addEventListener('transitionend', function () {
            self.Bird.style.transition = 'none';
            if(self.checkFail()){
                self.failGame();
            }else{
                console.log('a');
                self.setBirdInterval();
            }
        }, false)
        this.Move = this.autoMove.bind(this)
        document.addEventListener('click', this.Move, false)
    },
    autoMove : function (){
        if(this.checkFail()){
            this.failGame();
        }
        clearInterval(this.birdTimer);
        this.Bird.style.transition = 'top .2s';
        this.Bird.style.top = this.Bird.offsetTop - 40 + 'px';
    },
    setBirdInterval: function () {
        var self = this;
        var speed = 1;
        var g = 2;
        this.birdTimer = setInterval(function () {
            speed += g;
            self.Bird.style.top = self.Bird.offsetTop + speed + 'px';
            if(self.checkFail()){
                self.failGame();
            }
        }, 50)
    },
    startCreate: function () {
        this.createPipeTimer = setInterval(this.createPipe.bind(this), 1500);
    },
    createPipe: function () {
        var self = this;
        var pipeWrapper = document.createElement('div');
        var upPipe = document.createElement('img');
        var downPipe = document.createElement('img');
        var speed = 10;
        pipeWrapper.setAttribute('class', 'tube');
        upPipe.setAttribute('class', 'up');
        upPipe.setAttribute('src', './img/pipe2.png');
        upPipe.style.height = this.getRandomNum(100, 500) + 'px';
        downPipe.setAttribute('class', 'down');
        downPipe.setAttribute('src', './img/pipe1.png');
        downPipe.style.height = this.getRandomNum(100, document.body.clientHeight - parseInt(upPipe.style.height) - 50) + 'px';
        pipeWrapper.appendChild(upPipe);
        pipeWrapper.appendChild(downPipe);
        this.background.appendChild(pipeWrapper);
        this.pipeList.push(pipeWrapper);
        pipeWrapper.timer = setInterval(function () {
            pipeWrapper.style.left = pipeWrapper.offsetLeft - speed + 'px';
            if (pipeWrapper.offsetLeft <= -40) {
                self.addScore();
                clearInterval(pipeWrapper.timer);
                self.pipeList.shift();
            }
        }, 60)
    },
    checkFail: function () {
        var birdHeight = this.Bird.offsetHeight;
        var birdWidth = this.Bird.offsetWidth;
        var birdLeft = this.Bird.offsetLeft;
        var birdTop = this.Bird.offsetTop;
        console.log(birdTop, document.body.clientHeight);
        if (this.pipeList[0]) {
            var pipe = this.pipeList[0];
            var pipeWidth = pipe.offsetWidth;
            var up = pipe.getElementsByClassName('up')[0];
            var upTop = up.offsetHeight;
            var down = pipe.getElementsByClassName('down')[0];
            var downTop = document.body.clientHeight - down.offsetHeight;
            var left = pipe.offsetLeft;
            if ((birdLeft + birdWidth >= left && birdLeft < pipeWidth + pipe.offsetLeft) && (birdTop <= upTop || birdTop + birdHeight >= downTop)) {
                return true;
            }
        }
        if (birdTop <= 0 || birdTop >= document.body.clientHeight){
            return true;
        }
        return false;
    },
    failGame : function () {
        for(var i = 0; i < this.pipeList.length; i++){
            clearInterval(this.pipeList[i].timer);
        }
        clearInterval(this.birdTimer);
        clearInterval(this.createPipeTimer);
        clearInterval(this.backgroundTimer);
        document.removeEventListener('click', this.Move, false);
        var self = this;
        var mask = document.getElementById('mask');
        mask.style.display = 'block';
        var restart = document.getElementsByClassName('restart')[0];
        restart.onclick = function (){
            for(var i = 0; i < self.pipeList.length; i++){
                self.pipeList[i].remove();
            }
            self.pipeList = [];
            mask.style.display = 'none';
            window.location.reload();
        }
    },
    backgroundMove: function () {
        var self = this;
        var speed = 10;
        var left = 0;
        this.backgroundTimer = setInterval(function () {
            var width = self.background.offsetWidth;
            if (left - speed <= -width) {
                self.background.style.backgroundPosition = '0px 0px';
                left = 0;
            } else {
                left -= speed;
                self.background.style.backgroundPosition = `${left}px 0px`;
            }
        }, 60)
    },
    getRandomNum: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}