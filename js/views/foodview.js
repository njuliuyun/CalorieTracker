// js/views/foodview.js

var app = app || {};

(function($) {
    app.FoodView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click .remove': 'clear'
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        
        render: function() {
            this.$el.html(this.model.get('title') + ' * ' + this.model.get('amount') + '<button class="remove">X</button>');
            return this;
        },
        // destroy the item
        clear: function() {
            if (this.model.get('amount') <= 1) {
                this.model.destroy();
            }
            else this.model.save({amount: this.model.get('amount')-1});
        }
    });
})(jQuery);