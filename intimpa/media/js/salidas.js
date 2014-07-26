var intimpa = intimpa || {};

(function($) {

  $detalles = $('.detalles');
  $tplDetalle = $('#tpl-detalle-row');
  $almacen = $('#almacen');
  $documento = $('#documento');

  removeDetalle = function() {
    $tr = $(this).parent().parent();
    row = $tr.data('row');
    $tr.remove();
    intimpa.SalidaDetallesCollection.remove(row);
  }

  var acProductOptions = {
    minLength: 1,
    source: function(request, response) {
      $.ajax({
        url: '/api/almacen/stock-filter/',
        dataType: 'json',
        data: {
          term: request.term,
          almacen: $almacen.val()
        },
        success: function(data, e, xhr) {
          if(e)
          response($.map(data, function (item) {
            return {
              data: item,
              label: '(' + item.unidades + ') ' + item.producto.codigo + ' - ' + item.producto.producto,
              value: item.producto.codigo + ' - ' + item.producto.producto
            }
          }));
        }
      })
    },
    response: function(e, ui) {
      if(ui.content.length === 0) {
        var parent = $(e.target).parent();
        parent.find('.autocomplete-productos').val('');
      }
    },
    select: function(e, ui) {
      $('#producto-id').val(ui.item.data.producto.id);
      $('#unitario').val(ui.item.data.producto.precio_unidad);
    },
    change: function(e,ui) {
      if(!ui.item) {
        var parent = $(e.target).parent();
        parent.find('.autocomplete-productos').val('');
      }
    }
  }

  $('#add-detalle').click(function() {
    $producto = $('.autocomplete-productos');
    $cantidad = $('.cantidad');

    if($producto.val() !== '' &&
      $cantidad.val() !== '') {
      row = $tplDetalle.html();
      template = Handlebars.compile(row);

      var row = new Date().getTime();

      data = {
        row: row,
        producto: $producto.val(),
        cantidad: $cantidad.val()
      };

      $detalles.append(template(data));

      $detalles.find('[data-row=' + row + ']').delegate('.remove-detalle', 'click', removeDetalle);

      intimpa.SalidaDetallesCollection.add({
        'row': row,
        'producto': $('#producto-id').val(),
        'cantidad': data.cantidad
      }, {'validate': true});

      $producto.val('');
      $cantidad.val('').focus();

    } else {
      intimpa.betterAlert.warning('Completa los campos requeridos del detalle.');
      $cantidad.focus();
    }
  });

  $('.autocomplete-productos').autocomplete(acProductOptions);

  $('.autocomplete-productos').change(function() {
    if($(this).val() === '') {
      $('#producto-id').val('');
      $('#unitario').val('');
    }
  });

  $form = $('#the-form');
  $tplHidden = $('#tpl-hidden');

  getName = function(i, what) {
    return prefix + '-' + i + '-' + what;
  }

  $form.submit(function(e) {
    if(intimpa.SalidaDetallesCollection.length == 0) {
      e.preventDefault();
      intimpa.betterAlert.warning('Tiene que haber al menos un detalle de la venta.');
      $cantidad.focus();
      return false;
    }
    var i = 0;
    intimpa.SalidaDetallesCollection.each(function(item) {
      objProd = {
        'name': getName(i, 'producto'),
        'value': item.attributes.producto
      };
      objCant = {
        'name': getName(i, 'cantidad'),
        'value': item.attributes.cantidad
      };

      tplProducto = Handlebars.compile($tplHidden.html());
      tplCantidad = Handlebars.compile($tplHidden.html());

      htmlProducto = tplProducto(objProd);
      htmlCantidad = tplCantidad(objCant);

      $form.append(htmlProducto);
      $form.append(htmlCantidad);
      i++;
    });

    $('#id_' + prefix + '-TOTAL_FORMS').val(i);
    //e.preventDefault();
    //return false;
  });

  $almacen.change(function() {
    intimpa.SalidaDetallesCollection.reset();
    $detalles.html('');
    $('.autocomplete-productos').val('');
  });

})(jQuery)
