function timeLeft(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
}

$(document).ready(function () {
  $("#header").css({"top": '0', "position": 'fixed', "width": '100%', "z-index": '100'});
  $("#wrapper").css({"margin-top": '230px'});
  var today = new Date();
  var deadline = "January 1 " + (today.getFullYear() + 1) + " 00:00:00";
  if (today.getMonth() == 0 && today.getDate() == 1) {
    deadline = "January 1 " + today.getFullYear() + " 00:00:00";
  }

  var setClock = function (newyear) {
    var timeinterval = setInterval(function () {
      var t = timeLeft(newyear);
      $("#days").text(t.days);
      $("#days-text").text(declOfNum(t.days, ["День", "Дня", "Дней"]));

      $("#hours").text(t.hours);
      $("#hours-text").text(declOfNum(t.hours, ["Час", "Часа", "Часов"]));

      $("#mins").text(("0" + t.minutes).slice(-2));
      $("#mins-text").text(
        declOfNum(("0" + t.minutes).slice(-2), ["Минута", "Минуты", "Минут"])
      );

      $("#secs").text(("0" + t.seconds).slice(-2));
      $("#secs-text").text(
        declOfNum(("0" + t.seconds).slice(-2), ["Секунда", "Секунды", "Секунд"])
      );

      if (t.total <= 0) {
        clearInterval(timeinterval);
        var now = new Date();
        var yearStr = now.getFullYear().toString();
        $("#header").text("С новым годом!");
        $("#days").text(yearStr[0]);
        $("#days-text").text("С");
        $("#hours").text(yearStr[1]);
        $("#hours-text").text("Новым");
        $("#mins").text(yearStr[2]);
        $("#mins-text").text("Годом");
        $("#secs").text(yearStr[3]);
        $("#secs-text").text("!");
        $("#info").text("Счетчик начнется заново завтра!");
      }
    }, 1000);
  };

  setClock(deadline);
});