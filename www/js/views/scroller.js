App.Scroller = Ember.View.extend({
    mousedown: false,

    didInsertElement: function () {
        var view = this,
            element = this.get("element"),
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

    touchStart: function (event) {
        this.start(event.originalEvent.touches, event.timeStamp);
    },

    touchMove: function (event) {
        if (!this.get("isMoving")) {
	    return;
	}

        this.move(event.originalEvent.touches, event.timeStamp);
    },

    touchEnd: function (event) {
        if (!this.get("isMoving")) {
	    return;
	}

        this.end(event.timeStamp);
    },

    touchCancel: function (event) {
        if (!this.get("isMoving")) {
	    return;
	}

        this.end(event.timeStamp);
    },

    mouseDown: function (event) {
        this.start([{ pageX: event.pageX, pageY: event.pageY }], event.timeStamp);
    },

    mouseMove: function (event) {
        if (!this.get("isMoving")) {
	    return;
	}

        this.move([{ pageX: event.pageX, pageY: event.pageY }], event.timeStamp);
    },

    mouseUp: function (event) {
        if (!this.get("isMoving")) {
	    return;
	}

        this.end(event.timeStamp);
    },

    resize: function (event) {
        var element = this.get("element"),
            container = element.parentNode;

	this.scroller.setDimensions(container.clientWidth, container.clientHeight, element.offsetWidth, element.offsetHeight);
    },

    start: function (positions, timestamp) {
        this.set("isMoving", true);
	this.scroller.doTouchStart(positions, timestamp);
    },

    move: function (positions, timestamp) {
	this.scroller.doTouchMove(positions, timestamp);
    },

    end: function (timestamp) {
	this.scroller.doTouchEnd(timestamp);
        this.set("isMoving", false);
    }
});
