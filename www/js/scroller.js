App.Scroller = Ember.View.extend({
    didInsertElement: function () {
        this.scroller = new EasyScroller(
            this.$()[0],
            this.getProperties("scrollingX", "scrollingY", "zooming", "bouncing")
        );
    }
});
