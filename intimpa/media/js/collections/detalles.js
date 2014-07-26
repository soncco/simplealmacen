var intimpa = intimpa || {};

(function() {
  intimpa.Detalles = Backbone.Collection.extend({
    model: intimpa.Detalle,
    initialize: function() {}
  });

  intimpa.DetallesCollection = new intimpa.Detalles;
})();
