App = Ember.Application.create();

App.Router.map(function() {
    // put your routes here
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return ["red", "yellow", "blue", "red", "yellow", "blue", "red", "yellow", "blue", "red", "yellow", "blue"];
    }
});

// ref = new Firebase("https://splitr.firebaseio.com");

// auth = new FirebaseSimpleLogin(ref, function(error, user) {
//     alert(user);
// });
