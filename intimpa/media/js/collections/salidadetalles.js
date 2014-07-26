var intimpa = intimpa || {};

(function() {
  intimpa.SalidaDetalles = Backbone.Collection.extend({
    model: intimpa.SalidaDetalle,
    initialize: function() {}
  });

  intimpa.SalidaDetallesCollection = new intimpa.SalidaDetalles;
})();
