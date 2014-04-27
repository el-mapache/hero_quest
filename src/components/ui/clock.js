function Clock(callback) {
  this.startTime = +new Date;
  this.callback = callback || function() {};

  setInterval(TL.bind(this.update, this), 1000);
}

Clock.prototype.constructor = Clock;

Clock.prototype.update = function() {
  var ms = +new Date - this.startTime;

  var hms = {
    h: (ms / (60*60*1000)) | 0,
    m: ((ms / 60000) % 60) | 0,
    s: ((ms / 1000) % 60) | 0
  };

  var tc = [];

  tc.push((hms.h < 10 ? '0' + hms.h : hms.h));
  tc.push((hms.m < 10 ? '0' + hms.m : hms.m));
  tc.push((hms.s < 10 ? '0' + hms.s : hms.s));

  this.callback(tc.join(':'));
};
