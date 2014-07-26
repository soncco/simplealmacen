var intimpa = intimpa || {};

(function($) {

  $detalles = $('.detalles');
  $tplDetalle = $('#tpl-detalle-row');
  $almacen = $('#almacen');
  $tipo_venta = $('#tipo_venta');
  $total_venta = $('#total_venta');

  removeDetalle = function() {
    $tr = $(this).parent().parent();
    row = $tr.data('row');
    total = $tr.find('.total').text();
    $tr.remove();
    intimpa.VentaDetallesCollection.remove(row);
    previo_total = $total_venta.val() * 1;
    previo_total -= (total*1);
    $total_venta.val(previo_total.toFixed(2));
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
              label: '(' + item.unidades + ') ' + item.producto.codigo + ' - ' + item.producto.producto + ' - ' + item.producto.precio_unidad,
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
    $precioventa = $('.precioventa');

    if($producto.val() !== '' &&
      $cantidad.val() !== '' &&
      $precioventa.val() !== '') {
      row = $tplDetalle.html();
      template = Handlebars.compile(row);

      var row = new Date().getTime();

      data = {
        row: row,
        producto: $producto.val(),
        cantidad: $cantidad.val(),
        precioventa: $precioventa.val(),
        unitario: $('#unitario').val(),
        // subtotal: function () {
        //   return (this.cantidad * this.unitario).toFixed(2);
        // },
        total: function() {
          return (this.cantidad * this.precioventa).toFixed(2);
        }
      };

      $detalles.append(template(data));

      $detalles.find('[data-row=' + row + ']').delegate('.remove-detalle', 'click', removeDetalle);

      intimpa.VentaDetallesCollection.add({
        'row': row,
        'producto': $('#producto-id').val(),
        'precio_unitario': data.unitario,
        'cantidad': data.cantidad,
        'precioventa': data.precioventa,
      }, {'validate': true});

      previo_total = $total_venta.val() * 1;
      previo_total += (data.total()*1);
      $total_venta.val(previo_total.toFixed(2));

      $producto.val('');
      $cantidad.val('').focus();
      $precioventa.val(0);

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
    if(intimpa.VentaDetallesCollection.length == 0) {
      e.preventDefault();
      intimpa.betterAlert.warning('Tiene que haber al menos un detalle de la venta.');
      $cantidad.focus();
      return false;
    }

    var i = 0;
    total = 0;
    intimpa.VentaDetallesCollection.each(function(item) {
      objProd = {
        'name': getName(i, 'producto'),
        'value': item.attributes.producto
      };
      objUnit = {
        'name': getName(i, 'precio_unitario'),
        'value': item.attributes.precio_unitario
      };
      objCant = {
        'name': getName(i, 'cantidad'),
        'value': item.attributes.cantidad
      };
      objDesc = {
        'name': getName(i, 'precio_venta'),
        'value': item.attributes.precioventa
      };
      total += parseFloat(item.attributes.total);

      tplProducto = Handlebars.compile($tplHidden.html());
      tplUnitario = Handlebars.compile($tplHidden.html());
      tplCantidad = Handlebars.compile($tplHidden.html());
      tplPrecioVenta = Handlebars.compile($tplHidden.html());

      htmlProducto = tplProducto(objProd);
      htmlUnitario = tplUnitario(objUnit);
      htmlCantidad = tplCantidad(objCant);
      htmlPrecioVenta = tplPrecioVenta(objDesc);

      $form.append(htmlProducto);
      $form.append(htmlUnitario);
      $form.append(htmlCantidad);
      $form.append(htmlPrecioVenta);
      i++;
    });

    //$total_venta.val(total.toFixed(2));
    $('#id_' + prefix + '-TOTAL_FORMS').val(i);
    //e.preventDefault();
    //return false;
  });

  $almacen.change(function() {
    intimpa.VentaDetallesCollection.reset();
    $detalles.html('');
    $total_venta.val(0.0);
    $('.autocomplete-productos').val('');
  });

})(jQuery)
