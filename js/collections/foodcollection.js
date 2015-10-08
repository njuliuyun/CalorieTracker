// js/collections/foodcollection.js
var app = app || {};
(function($) {
    var FoodList = Backbone.Firebase.Collection.extend({
        model: app.Food,
        url: 'https://calorietracker.firebaseio.com/'
    });
    /* var FoodList = Backbone.Collection.extend({
        model: app.Food,
        localStorage: new Backbone.LocalStorage('calorie-backbone'),
    }); */
    app.foodList = new FoodList();
    //app.foodList = new FoodList([new app.Food({title:'bagel', calorie:100}), new app.Food({title:'cake', calorie:100})]);
    //app.foodList.create({title:'bagel', calorie:100});
})(jQuery);

