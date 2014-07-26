from django.conf.urls import patterns, include, url

urlpatterns = patterns('front.views',
  url(r'^$', 'index', name = 'index'),

  url(r'^login/$', 'the_login', name = 'the_login'),
  url(r'^logout/$', 'the_logout', name = 'the_logout'),

  url(r'^venta/$', 'venta', name = 'venta'),
  url(r'^venta/ver/(?P<id>.*)$', 'venta_view', name = 'venta_view'),
  url(r'^ventas/$', 'ventas', name = 'ventas'),
  url(r'^venta/print/(?P<id>.*)$', 'venta_print', name = 'venta_print'),

  url(r'^entrada/$', 'entrada', name = 'entrada'),
  url(r'^entrada/ver/(?P<id>.*)$', 'entrada_view', name = 'entrada_view'),
  url(r'^entradas/$', 'entradas', name = 'entradas'),
  url(r'^entrada/print/(?P<id>.*)$', 'entrada_print', name = 'entrada_print'),

  url(r'^salida/$', 'salida', name = 'salida'),
  url(r'^salida/ver/(?P<id>.*)$', 'salida_view', name = 'salida_view'),
  url(r'^salidas/$', 'salidas', name = 'salidas'),
  url(r'^salida/print/(?P<id>.*)$', 'salida_print', name = 'salida_print'),

  url(r'^gasto/$', 'gasto', name = 'gasto'),
  url(r'^gasto/ver/(?P<id>.*)$', 'gasto_view', name = 'gasto_view'),
  url(r'^gastos/$', 'gastos', name = 'gastos'),

  url(r'^proveedores/$', 'proveedores', name = 'proveedores'),

  url(r'^inventario/$', 'inventario', name = 'inventario'),
  url(r'^inventario/print/(?P<id>.*)$', 'inventario_print', name = 'inventario_print'),

  url(r'^liquidacion/$', 'liquidacion', name = 'liquidacion'),
  url(r'^liquidacion/print/(?P<fecha>.*)/(?P<id>.*)/(?P<user>.*)$', 'liquidacion_print', name = 'liquidacion_print'),

  url(r'^comisiones/$', 'comisiones', name = 'comisiones'),
)