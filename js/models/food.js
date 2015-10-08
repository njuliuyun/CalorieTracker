// js/models/food.js
var app = app || {};
(function($){
    app.Food = Backbone.Model.extend({
        defaults: {
            title: '',
            calorie: 0,
            amount: 1,
        }
    });
})(jQuery);