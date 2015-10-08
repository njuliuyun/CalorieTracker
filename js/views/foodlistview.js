// js/views/foodlistview.js

var app = app || {};

(function($) {
    app.FoodListView = Backbone.View.extend({
        el: $('#display-section'),
        initialize: function() {
            this.$list = this.$('#food-list');
            this.$total = this.$('#total span');
            this.totalC = 0;
            this.listenTo(app.foodList, 'add', this.addOne);
            this.listenTo(app.foodList, 'change', this.addAll);
            this.listenTo(app.foodList, 'remove', this.updateTotal);
            app.foodList.fetch({reset: true});
        },
        render: function() {
           
            return this;
        },
        addOne: function(food) {
            var foodView = new app.FoodView({model: food});
            this.$list.append(foodView.render().el);
            this.totalC += food.get('calorie') * food.get('amount');
            this.$total.text(this.totalC); 
        },
        addAll: function () {
			this.$list.html('');
            this.totalC = 0;
			app.foodList.each(this.addOne, this);
		},
        
        updateTotal: function() {
            this.totalC = 0;
            app.foodList.each(function(food) {
                this.totalC += food.get('calorie') * food.get('amount');
            }, this);
            this.$total.text(this.totalC);
        }
    });
    
    
})(jQuery);

