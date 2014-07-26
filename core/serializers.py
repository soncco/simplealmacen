from models import Producto, Proveedor
from rest_framework import serializers

class ProductoSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Producto
    fields = ('url', 'id', 'codigo', 'unidad_caja', 'producto', 'precio_unidad', 'activo')

class ProductoAlmacenSerializer(serializers.ModelSerializer):
  class Meta(object):
    model = Producto
    fields = ('id', 'codigo', 'unidad_caja', 'producto', 'precio_unidad', 'activo')      

class ProveedorSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Proveedor
    fields = ('url', 'id', 'razon_social', 'ruc', 'direccion',)
