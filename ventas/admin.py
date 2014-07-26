from django.contrib import admin

from models import Venta, VentaDetalle

class VentaDetalleInline(admin.TabularInline):
  model = VentaDetalle

class VentaAdmin(admin.ModelAdmin):
  list_display = ('fecha', 'documento', 'numero_documento', 'vendedor', 'cliente', 'total_venta',)
  list_filter = ('vendedor__first_name', 'fecha', 'cliente',)
  inlines = [VentaDetalleInline,]

admin.site.register(Venta, VentaAdmin)
