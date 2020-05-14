function Clock (wrap) {
    var date = new Date();

    this.wrap = wrap;
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.week = date.getDay();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
    
    this.weekDay = ['日', '一', '二', '三', '四', '五', '六'];
    this.oyear = null;
    this.monthArr = [];
    this.dayArr = [];
    this.weekArr = [];
    this.hourArr = [];
    this.minuteArr = [];
    this.secondArr = [];
    
    this.monthDeg = 360 / 12;
    this.dayDeg = 360 / this.getMonthDay();
    this.weekDeg = 360 / 7;
    this.hourDeg = 360 / 24;
    this.minuteDeg = 360 / 60;
    this.secondDeg = 360 / 60;
    this.currentMonthDeg = 0;
    this.currentDayDeg = 0;
    this.currentWeekDeg = 0;
    this.currentHourDeg = 0;
    this.currentMinuteDeg = 0;
    this.currentSecondDeg = 0;
}

Clock.prototype.init = function () {
    this.createClock();
    this.setTransform();
    this.setStartTranform();
}

Clock.prototype.getMonthDay = function () {
    var day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
        day[1] = 29;
    }
    return day[this.month - 1];
}

Clock.prototype.createClock = function () {
    var fragment = document.createDocumentFragment();

    var yearWrapper = document.createElement('div');
    yearWrapper.className = 'year';
    this.yearWrapper = yearWrapper;
    var oyear = document.createElement('span');
    oyear.innerText = this.year + '年';
    this.oyear = oyear;
    yearWrapper.appendChild(oyear);

    var monthWrapper = document.createElement('div');
    monthWrapper.className = 'month';
    this.monthWrapper = monthWrapper;
    for(var i = 1; i <= 12; i++){
        var omonth = document.createElement('span');
        omonth.innerText = i + '月';
        monthWrapper.appendChild(omonth);
        this.monthArr.push(omonth);
    }

    var dayWrapper = document.createElement('div');
    dayWrapper.className = 'day';
    this.dayWrapper = dayWrapper;
    for (var i = 1; i <= this.getMonthDay(); i ++){
        var oDay = document.createElement('span');
        oDay .innerText = i + '日';
        dayWrapper.appendChild(oDay);
        this.dayArr.push(oDay);
    }

    var weekWrapper = document.createElement('div');
    weekWrapper.className = 'week';
    this.weekWrapper = weekWrapper;
    for (var i = 0; i < 7; i++){
        var oWeek = document.createElement('span');
        oWeek.innerText = '星期' + this.weekDay[i];
        weekWrapper.appendChild(oWeek);
        this.weekArr.push(oWeek);
    }

    var hourWrapper = document.createElement('div');
    hourWrapper.className = 'hour';
    this.hourWrapper = hourWrapper;
    for (var i = 0; i < 24; i++){
        var oHour = document.createElement('span');
        oHour.innerText = i + '时';
        hourWrapper.appendChild(oHour);
        this.hourArr.push(oHour);
    }

    var minuteWrapper = document.createElement('div');
    minuteWrapper.className = 'minute';
    this.minuteWrapper = minuteWrapper;
    for (var i = 0; i < 60; i++){
        var oMinute = document.createElement('span');
        oMinute.innerText = i + '分';
        minuteWrapper.appendChild(oMinute);
        this.minuteArr.push(oMinute);
    }

    var secondWrapper = document.createElement('div');
    secondWrapper.className = 'second';
    this.secondWrapper = secondWrapper;
    for (var i = 0; i < 60; i++){
        var osecond = document.createElement('span');
        osecond.innerText = i + '秒';
        secondWrapper.appendChild(osecond);
        this.secondArr.push(osecond);
    }

    fragment.appendChild(yearWrapper);
    fragment.appendChild(monthWrapper);
    fragment.appendChild(dayWrapper);
    fragment.appendChild(weekWrapper);
    fragment.appendChild(hourWrapper);
    fragment.appendChild(minuteWrapper);
    fragment.appendChild(secondWrapper);

    this.wrap.appendChild(fragment);
}

Clock.prototype.setTransform = function () {
    var self = this;
    setTimeout(function () {
        var oSpan = document.getElementsByTagName('span');
        for (var i = 0; i < oSpan.length; i++){
            oSpan[i].style.width = '100%';
        }
    }, 250)
    setTimeout(function () {
        for(var i = 0; i < self.monthArr.length; i++){
            self.monthArr[i].style.transform = 'rotate(' + i * self.monthDeg +'deg)';
        }
        for(var i = 0; i < self.dayArr.length; i++){
            self.dayArr[i].style.transform = 'rotate(' + i * self.dayDeg + 'deg)';
        }
        for (var i = 0; i < self.weekArr.length; i++){
            self.weekArr[i].style.transform = 'rotate(' + i * self.weekDeg + 'deg)';
        }
        for (var i = 0; i < self.hourArr.length; i++){
            self.hourArr[i].style.transform = 'rotate(' + i * self.hourDeg + 'deg)';
        }
        for (var i = 0; i < self.minuteArr.length; i++){
            self.minuteArr[i].style.transform = 'rotate(' + i * self.minuteDeg + 'deg)';
        }
        for (var i = 0; i < self.secondArr.length; i++){
            self.secondArr[i].style.transform = 'rotate(' + i * self.secondDeg + 'deg)';
        }
    }, 750)
    
}

Clock.prototype.setStartTranform = function () {
    var self = this;
    setTimeout(function () {
        self.currentMonthDeg = -(self.month - 1) * self.monthDeg;
        self.monthWrapper.style.transform = 'rotate(' + self.currentMonthDeg + 'deg)';

        self.currentDayDeg = -(self.day - 1) * self.dayDeg;
        self.dayWrapper.style.transform = 'rotate(' + self.currentDayDeg + 'deg)';

        self.currentWeekDeg = -(self.week) * self.weekDeg;
        self.weekWrapper.style.transform = 'rotate(' + self.currentWeekDeg + 'deg)';

        self.currentHourDeg = -self.hour * self.hourDeg;
        self.hourWrapper.style.transform = 'rotate(' + self.currentHourDeg + 'deg)';

        self.currentMinuteDeg = -self.minute * self.minuteDeg;
        self.minuteWrapper.style.transform = 'rotate(' + self.currentMinuteDeg + 'deg)';

        self.currentSecondDeg = -self.second * self.secondDeg;
        self.secondWrapper.style.transform = 'rotate(' + self.currentSecondDeg + 'deg)';

        setInterval(function () {
            self.currentSecondDeg -= self.secondDeg;
            self.secondWrapper.style.transform = 'rotate(' + self.currentSecondDeg + 'deg)';
            var second = new Date().getSeconds();
            var minute = new Date().getMinutes();
            var hour = new Date().getHours();
            var day = new Date().getDate();
            var month = new Date().getMonth() + 1;
            if(second == 0){
                self.currentMinuteDeg -= self.minuteDeg;
                self.minuteWrapper.style.transform = 'rotate(' + self.currentMinuteDeg + 'deg)';
                if(minute == 0){
                    self.currentHourDeg -= self.hourDeg;
                    self.hourWrapper.style.transform = 'rotate(' + self.currentHourDeg + 'deg)';
                    if(hour == 0){
                        self.currentDayDeg -= self.dayDeg;
                        self.dayWrapper.style.transform = 'rotate(' + self.currentDayDeg + 'deg)';
                        self.currentWeekDeg -= self.weekDeg;
                        self.weekWrapper.style.transform = 'rotate(' + self.currentWeekDeg + 'deg)';
                        if(day == 1){
                            self.month = month;
                            self.currentMonthDeg -= self.monthDeg;
                            self.monthWrapper.style.transform = 'rotate(' + self.currentMonthDeg + 'deg)';
                            self.changeMonth();
                            if(month == 1){
                                self.oyear.innerText = parseInt(self.oyear.innerText) + 1 + '年';
                            }
                        }
                    }
                }
            }
        }, 1000)
    }, 1250)
}
Clock.prototype.changeMonth = function () {
    this.dayWrapper.innerHTML = '';
    this.dayArr = [];
    for (var i = 1; i <= this.getMonthDay(); i ++){
        var oDay = document.createElement('span');
        oDay.innerText = i + '日';
        dayWrapper.appendChild(oDay);
        this.dayArr.push(oDay);
    }
    this.dayDeg = 360 / this.getMonthDay();
    for(var i = 0; i < self.dayArr.length; i++){
        self.dayArr[i].style.transform = 'rotate(' + i * self.dayDeg + 'deg)';
    }
}


var wrap = document.getElementsByClassName('wrap')[0];
var clock = new Clock(wrap);
clock.init();