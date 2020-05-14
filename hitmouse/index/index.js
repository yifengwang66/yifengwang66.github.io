var score = 0;
var father = document.getElementById('wrapper');
var hole = father.children;
var length = hole.length;
var mouseNumber = [];
var speed = 1000;
(function initMouseNumber() {
    for (var i = 0; i < length; i++) mouseNumber[i] = i;
}())
var timer = setInterval(function(){
    createMouse();
}, speed);
handleMouseDown();
handleMouseUp();
function addAndShowScore(num) {
    var dom = document.getElementsByClassName("scorebox")[0];
    score += num;
    dom.innerText = score;
}
function createMouse() {
    var num = createRandomNum();
    var dom = hole[num];
    var newMouse = document.createElement('div');
    newMouse.num = num;
    newMouse.setAttribute('class', 'mouse');
    dom.appendChild(newMouse);
    if(checkFail()){
        stopGame();
    }
}
function checkFail(){
    if(mouseNumber.length >= 3) return false;
    else return true;
}
function createRandomNum() {
    var length = mouseNumber.length;
    var randomNum = Math.floor(Math.random() * length);
    var num = mouseNumber.splice(randomNum, 1)[0];
    return num;
}
function handleMouseDown(){
    father.onmousedown = function (e){
        hit('down');
        var event = e.target;
        var isMouse = event.classList.contains('mouse');
        var isHole = event.classList.contains('hole');
        if(isMouse){
            hitMouse(event);
        }else if(isHole){
            hitHole();
        }
        judgescore();
    }
}
function handleMouseUp(){
    father.onmouseup = function (){
        hit('up');
    }
}
function hit (state){
    var cursor = state === 'down'? "url('../image/hammerdown.ico'), auto" : "url('../image/hammer.ico'), auto";
    father.style.cursor = cursor;
}
function hitMouse(mouse){
    var num = mouse.num;
    mouseNumber.push(num);
    showBoom(mouse);
    addAndShowScore(200);
    mouse.remove();
}
function showBoom(mouse){
    var dom = mouse.parentElement;
    var boom = document.createElement('div');
    boom.setAttribute('class', 'boom');
    dom.appendChild(boom);
    setTimeout(function(){
        boom.remove();
    }, 300)
}
function hitHole(){
    addAndShowScore(-500);
}
function judgescore(){
    if(score < 0) stopGame();
    else if(0 <= score && score < 2000) level(0);
    else if(2000 <= score && score < 6000) level(1);
    else if(6000 <= score && score < 10000) level(2);
    else if(10000 <= score && score < 13000) level(3);
    else winGame();
}
function level(le){
    switch(le){
        case 0: speed = speed;
        case 1: speed = 500;break;
        case 2: speed = 200;break;
        case 3: speed = 100;break;
    }
    clearInterval(timer);
    timer = setInterval(function (){
        createMouse();
    },speed)
}
function stopGame(){
    clearInterval(timer);
    father.onmousedown = null;
    father.onmouseup = null;
    hit('up');
    setTimeout(function (){
        clearMouse();
        alert('打个地鼠都打不赢还打王者，乖乖去学习去吧，你不适合游戏！');
        score = 0;
        addAndShowScore(0);
    }, 200);
}
function winGame(){
    clearInterval(timer);
    clearMouse();
    alert('哎呦，不错哦，不要骄傲，这个手速只能证明你还没有在家呆到痴呆，hiahiahia');
}
function clearMouse(){
    var mouses = father.getElementsByClassName('mouse');
    var mouseLength = mouses.length;
    for(var i = mouseLength-1; i >= 0; i--){
        mouses[i].remove();
    }
}