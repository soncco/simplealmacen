var intimpa = intimpa || {};

(function() {

  intimpa.Detalle = Backbone.Model.extend({
    idAttribute: "row",
    defaults: function() {
      return {
        row: 0,
        producto: 0,
        precio_unitario: 0,
        cantidad: 1,
        precioventa: 0,
      }
    },

    validate: function(attribs) {
      if(attribs.producto < 0) {
        return 'No haz escogido un producto';
      }

      if(attribs.cantidad < 1) {
        return 'La cantidad debe ser mayor que cero';
      }
    },

    initialize: function() {
      this.on('invalid', function(model, error){
        console.log('error');;
        intimpa.betterAlert.warning(error);
      });
    }
  });
})();
