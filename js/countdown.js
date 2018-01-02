(function(win, $, undefined) {
	var defaults = {
		end: null
	};
	$.fn.countDown = function(opts) {
		this.opts = $.extend({}, defaults, opts || {});
		this.now = new Date();
		this.showTime = countTime.call(this);
		renderHtml.call(this);
		setDom.call(this);
		intervalTime.call(this);
		$(window).on(
			"resize",
			function() {
				setDom.call(this);
			}.bind(this)
		);
	};
	var intervalTime = function() {
		this.now = new Date();
		this.showTime = countTime.call(this);
		setTimeToDom.call(this);
		var timer = null;
		timer = setTimeout(
			function() {
				intervalTime.call(this);
			}.bind(this),
			1000
		);
	};
	var setDom = function() {
		var box = $("#timeBox");
		var w = box.width();
		var lw = w / 11;
		box.find(".iconfont").css({
			fontSize: lw,
			left: 0
		});
		box.find(".num-inner").css({
			marginLeft: -lw / 2
		});
		box.find(".num").css({
			width: lw,
			height: lw + 2
		});
		box.find(".t").css({
			fontSize: lw,
			height: lw + 2
			//lineHeight: lw + 2
		});
		box.find(".time-item").css({
			height: box.find(".num-box").height() + 37,
			margin: "0"
		});
	};
	var setTimeToDom = function() {
		var showTime = this.showTime;
		var daysArr = showTime.day.split("");
		var hoursArr = showTime.hours.split("");
		var minArr = showTime.min.split("");
		var secArr = showTime.sec.split("");
		setShow("days_", daysArr);
		setShow("hours_", hoursArr);
		setShow("min_", minArr);
		setShow("secs_", secArr);
	};
	var setShow = function(p, arr) {
		var h = $("#timeBox")
			.find(".iconfont")
			.height();
		var pix = p;

		for (var i = 0; i < arr.length; i++) {
			if (
				arr[i] == 9 &&
				$("#timeBox .num[data-index='" + pix + i + "'] .num-inner").css(
					"top"
				) !=
					-(h * 9) + "px"
			) {
				$("#timeBox .num[data-index='" + pix + i + "'] .num-inner").css(
					{
						top: -(h * 10)
					}
				);
			}
			if (
				pix !== "days" &&
				i != 1 &&
				arr[i] == 5 &&
				$("#timeBox .num[data-index='" + pix + i + "'] .num-inner").css(
					"top"
				) !=
					-(h * 5) + "px"
			) {
				$("#timeBox .num[data-index='" + pix + i + "'] .num-inner").css(
					{
						top: -(h * 6)
					}
				);
			}
			$("#timeBox .num[data-index='" + pix + i + "'] .num-inner").animate(
				{ top: -(h * arr[i]) },
				400
			);
		}
	};

	var renderHtml = function() {
		var showTime = this.showTime;
		var str = [];
		str.push(" <div class='time-box' id='timeBox'>");

		str.push("                <div class='time-item' id='daysItem'>");
		str.push("                    <div class='num-box'>");
		for (var i = 0; i < showTime.day.length; i++) {
			str.push(
				"                        <div class='num' data-index='days_" +
					i +
					"'>"
			);
			str.push("                            <div class='num-inner'>");
			str.push(renderNumber());
			str.push("                            </div>");
			str.push("                        </div>");
		}

		str.push("                    </div>");
		str.push("                    <div class='time-type'>DAYS</div>");
		str.push("                </div>");
		str.push("<span class='t3'></span>");
		str.push("                <div class='time-item' id='hoursItem'>");
		str.push("                    <div class='num-box'>");
		for (var i = 0; i < showTime.hours.length; i++) {
			str.push(
				"                        <div class='num' data-index='hours_" +
					i +
					"'>"
			);
			str.push("                            <div class='num-inner'>");

			str.push(renderNumber(i == 0 ? 5 : null));
			str.push("                            </div>");
			str.push("                        </div>");
		}

		str.push("                    </div>");
		str.push("                    <div class='time-type'>HOURS</div>");
		str.push("                </div>");

		str.push('<span class="t">:</span>');
		str.push("                <div class='time-item' id='minItem'>");
		str.push("                    <div class='num-box'>");
		for (var i = 0; i < showTime.min.length; i++) {
			str.push(
				"                        <div class='num' data-index='min_" +
					i +
					"'>"
			);
			str.push("                            <div class='num-inner'>");

			str.push(renderNumber(i == 0 ? 5 : null));
			str.push("                            </div>");
			str.push("                        </div>");
		}

		str.push("                    </div>");
		str.push("                    <div class='time-type'>MINUTES</div>");
		str.push("                </div>");
		str.push('<span class="t">:</span>');
		str.push("                <div class='time-item' id='secItem'>");
		str.push("                    <div class='num-box'>");
		for (var i = 0; i < showTime.sec.length; i++) {
			str.push(
				"                        <div class='num' data-index='secs_" +
					i +
					"'>"
			);
			str.push("                            <div class='num-inner'>");

			str.push(renderNumber(i == 0 ? 5 : null));
			str.push("                            </div>");
			str.push("                        </div>");
		}

		str.push("                    </div>");
		str.push("                    <div class='time-type'>SECONDS</div>");
		str.push("                </div>");

		str.push("</div>");
		$(this).append(str.join(""));
	};
	var renderNumber = function(num) {
		var num = num ? num : 9;
		var numStr = [];
		for (var n = 0; n <= num; n++) {
			numStr.push("<i class='iconfont icon-" + n + "'></i>");
		}
		return numStr.join("");
	};
	var countTime = function() {
		var end = new Date(this.opts.end).getTime();
		var now = this.now.getTime();
		var space = (end - now) / 1000;
		var res = {};
		res.day = parseInt(space / (60 * 60 * 24), 10) + "";
		res.hours = parseInt((space % (60 * 60 * 24)) / (60 * 60), 10) + "";
		res.min = parseInt((space % (60 * 60)) / 60, 10) + "";
		res.sec = parseInt(space % 60, 10) + "";
		if (res.day < 10) {
			res.day = "0" + res.day;
		}
		if (res.hours < 10) {
			res.hours = "0" + res.hours;
		}
		if (res.min < 10) {
			res.min = "0" + res.min;
		}

		if (res.sec < 10) {
			res.sec = "0" + res.sec;
		}
		return res;
	};
})(window, jQuery);
