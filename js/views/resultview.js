// js/views/resultview.js

var app = app || {};

(function($) {
    app.ResultView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#result-template').html()),
        events: {
          'click .add': 'addFood'          
        },
        initialize: function() {
            this.title = this.model.get('title');
            
        },
        render: function() {
            this.$el.html(this.template({result: this.title}));
            this.$servingInput = this.$('.serving');
            
            return this;
        },
        addFood: function() {
            var foodExist = app.foodList.findWhere({title: this.title});
            var amount = this.$servingInput.val();
            if (isNaN(amount)) amount = 1;
            else amount = parseInt(amount);
            if (foodExist) {                
                foodExist.save({amount: foodExist.get('amount') + amount});
            }
            else {
                app.foodList.add({
                    title: this.title,
                    calorie: this.model.get('calorie'),
                    amount: amount
                });
            }           
        }
    });
    
    app.ResultsView = Backbone.View.extend({
        el: $('#search-section'),
        events: {
            'click #search-btn': 'getResult',
            'keypress #search-input': 'getOnEnter'
        },
        initialize: function() {
            this.$input = $('#search-input');
            this.$results = this.$('#result-list');
        },
        getResult: function() {
            var searchInput = this.$input.val();
            var url = 'https://api.nutritionix.com/v1_1/search/'+searchInput+'?results=0:20&fields=item_name,brand_name,nf_calories&appId=b778c2c4&appKey=d801ad2646a7d6c0f113f03957875f5a';
            this.$input.val('');
            
            this.$results.html('');
            var self = this;
            var nutriRequestTimeout = setTimeout(function() {
                self.$results.text("failed to get calorie data");
            }, 8000);
                    
            $.ajax({
                url: url,
                dataType: "json",
                success: function(data) {
                    var results = data['hits'];
                    for (var i = 0; i < results.length; i++) {
                        var result = results[i]['fields'];
                        var food = new app.Food({
                                title: result['item_name']+ ' @ '+result['brand_name'],
                                calorie: result['nf_calories']
                            })
                        var resultview = new app.ResultView({
                            model: food
                        });
                        self.$results.append(resultview.render().el);
                        
                    }
                    clearTimeout(nutriRequestTimeout);
                }
            });
        },
        getOnEnter: function() {
            if (event.which !== ENTER_KEY || !this.$input.val().trim()) return;
            this.getResult();
        }
    });
    
})(jQuery);