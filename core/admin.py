from django.contrib import admin

from models import Producto, Proveedor, Gasto

class ProductoAdmin(admin.ModelAdmin):
  list_display = ('codigo', 'producto', 'unidad_caja','precio_unidad', 'activo',)
  list_filter = ('activo',)
  search_fields = ['codigo', 'producto']

class ProveedorAdmin(admin.ModelAdmin):
  list_display = ('razon_social', 'ruc', 'direccion', 'telefono',)
  search_fields = ['razon_social', 'ruc', 'direccion']

class GastoAdmin(admin.ModelAdmin):
  list_display = ('fecha', 'quien', 'almacen', 'monto',)
  list_filter = ('fecha', 'quien', 'almacen')

admin.site.register(Producto, ProductoAdmin)
admin.site.register(Proveedor, ProveedorAdmin)
admin.site.register(Gasto, GastoAdmin)

# Overwrite Admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django.db.models import Q
from django.utils.translation import gettext as _

class MyUserAdmin(UserAdmin):
  def completo(self, obj):
    return "%s %s" % (obj.first_name, obj.last_name)

  def grupos(self, obj):
    gs = ""
    for grupo in obj.groups.all():
      gs += grupo.name + " "

    return gs

  list_display = ('username', 'completo', 'grupos',)
  list_display_links = ('username',)

  fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email')}),
        (_('Staff'), {'fields': ('is_staff',)}),
        (_('Groups'), {'fields': ('groups',)}),
    )

  def queryset(self, request):
    qs = super(MyUserAdmin, self).queryset(request)
    qs = qs.filter(~Q(username = 'admin'))
    return qs

admin.site.unregister(User)
admin.site.register(User, MyUserAdmin)
