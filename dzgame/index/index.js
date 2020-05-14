var game = {
    scoreArea : document.getElementsByClassName('score')[0],
    maxlost : 10,
    lost : 0,
    score : 0,
    letters : [],
    isCreating : false,
    isMoving : false,
    isOver : false,
    init : function (){
        this.initData();
        this.render();
        this.startCreate();
        this.startMove();
        this.getScore();
    },
    initData : function (){ 
        this.container = document.getElementsByClassName("container")[0];
    },
    render : function (){
        this.scoreArea.innerHTML = 
        `
        <p class="text">得分: ${this.score}</p>
        <p class="text">丢失: ${this.lost} / ${this.maxlost}</p>
        `
    },
    addScore : function (){
        this.score += 10;
        this.render();
    },
    addLost :function (){
        if(this.lost >= this.maxlost){
            this.stopGame();
        }else {
            this.lost += 1;
            this.render();
        }
    },
    reset : function (){
        this.score =  0;
        this.lost = 0;
        this.render();
    },
    createLetter : function (){
        var charnum = this.getRandomNum(65, 65 + 26);
        var img = document.createElement('img');
        var char = String.fromCharCode(charnum);
        img.src = `./image/letter/${char}.png`;
        img.style.left = this.getRandomNum(0, this.container.clientWidth - img.width) + 'px';
        this.container.appendChild(img);
        var letter = {
            dom : img,
            char : char,
            top : -img.height,
            speed : this.getRandomNum(100, 300),
            render : function (){
                this.dom.style.top = this.top + 'px';
            },
            move : function (time){
                var dis = time * this.speed;
                this.top += dis;
                this.render();
            },
            kill : function (){
                this.dom.remove();
            },
            removeIndex : function (dom){
                var index = this.letters.indexOf(dom);
                this.letters.splice(index, 1);
            }
        };
        this.letters.push(letter);
        letter.render();
        console.log(this.letters);
    },
    startCreate : function (){
        var self = this;
        if(this.isCreating) {return};
        this.createTimer = setInterval (function (){
            self.createLetter();
        }, 500);
        this.isCreating  = true;
    },
    stopCreate : function (){
        clearInterval(this.createTimer);
        this.isCreating = false;
    },
    startMove : function (){
        if(this.isMoving){
            return;
        }
        var self = this;
        var time = 0.016;
        this.timer = setInterval(function (){
            for(var i = 0; i < self.letters.length; i++){
                var letter = self.letters[i];
                letter.move(time);
                if(letter.top >= self.container.clientHeight){
                    letter.kill();
                    letter.removeIndex.call(game, letter);
                    i--;
                    self.addLost();
                }
            }
        }, time*1000)
        this.isMoving = true;
    },
    stopMove : function (){
        clearInterval(this.timer);
        this.isMoving = false;
    },
    stopGame : function (){
        this.stopMove();
        this.stopCreate();
        this.isOver = true;
        this.handleMask();

    },
    handleMask : function(){
        var self = this;
        this.mask = document.getElementsByClassName('mask')[0];
        this.restart = this.mask.getElementsByTagName('div')[0];
        this.mask.style.display = 'block';
        this.restart.onclick = function (){
            self.mask.style.display = "none";
            self.reset();
            self.reStartGame();
            
        }
    },
    reStartGame : function (){
        for(var i = 0; i < this.letters.length; i++){
            this.letters[i].kill();
            this.letters[i].removeIndex.call(game, this.letters[i]);
            i--;
        }
        this.startCreate();
        this.startMove();
        this.isOver = false;
    },
    getScore : function (){
        var self = this;
        window.onkeydown = function (e){
            if(self.isOver){return};
            var key = e.key.toUpperCase();
            for(var i = 0; i < self.letters.length; i++){
                var letter = self.letters[i];
                if(key === letter.char){
                    letter.kill();
                    letter.removeIndex.call(game, letter);
                    self.addScore();
                    return;
                }
            }
        }
    },
    getRandomNum : function (min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }
}