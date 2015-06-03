var Order = can.Model.extend({
  create: 'POST /api/orders'
}, {
  define: {
    status: {
      value: 'new'
    },
    items: {
      Value: can.List
    },
    total: {
      get: function() {
        var total = 0.0;
        this.attr('items').forEach(function(item){
          total += parseFloat(item.attr('price'));
        });
        return total.toFixed(2);
      }
    }
  },

  markAs: function(status) {
    this.attr('status', status);
    this.save();
  }
});

Order.List = Order.List.extend({
  totals: function(){
    return this.map(function(order){
      return order.attr("total");
    });
  }
});
