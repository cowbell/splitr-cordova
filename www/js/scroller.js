App.Scroller = Ember.View.extend({
    mousedown: false,

    didInsertElement: function () {
        var view = this,
            options = this.getProperties("scrollingX", "scrollingY", "bouncing");

        options.zooming = false;

        this.scroller = new Scroller(function (left, top) {
            view.$().css({
                marginLeft: left ? (-left) + "px" : "",
                marginTop: top ? (-top) + "px" : ""
            });
	}, options);

        this.resizeHandler = function () {
            view.resize();
        };

        $(window).on("resize", this.resizeHandler);

        this.resize();
    },

    willDestroyElement: function () {
        $(window).off(this.resizeHandler);
    },

    shouldIgnoreScroll: function (event) {
        return /input|textarea|select/i.test(event.target.tagName);
    },

    touchStart: function (event) {
        if (this.shouldIgnoreScroll(event)) {
            return;
        }

	this.scroller.doTouchStart(event.originalEvent.touches, event.timeStamp);
	event.preventDefault();
    },

    touchMove: function (event) {
	this.scroller.doTouchMove(event.originalEvent.touches, event.timeStamp, event.scale);
    },

    touchEnd: function (event) {
	this.scroller.doTouchEnd(event.timeStamp);
    },

    touchCancel: function (event) {
	this.scroller.doTouchEnd(event.timeStamp);
    },

    mouseDown: function (event) {
        if (this.shouldIgnoreScroll(event)) {
            return;
        }

	this.scroller.doTouchStart([{ pageX: event.pageX, pageY: event.pageY }], event.timeStamp);
        this.mousedown = true;

        event.preventDefault();
    },

    mouseMove: function (event) {
	if (!this.mousedown) {
	    return;
	}

	this.scroller.doTouchMove([{ pageX: event.pageX, pageY: event.pageY }], event.timeStamp);
    },

    mouseUp: function (event) {
	if (!this.mousedown) {
	    return;
	}

	this.scroller.doTouchEnd(event.timeStamp);
	this.mousedown = false;
    },

    resize: function (event) {
        var element = this.get("element"),
            container = element.parentNode;

	this.scroller.setDimensions(container.clientWidth, container.clientHeight, element.offsetWidth, element.offsetHeight);
    }
});
