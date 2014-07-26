# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User
from decimal import *

class Venta(models.Model):
  DOCUMENTOS = (
    ('B', 'Boleta'),
    ('F', 'Factura'),
  )
  almacen = models.ForeignKey('almacen.Almacen')
  fecha = models.DateField()
  documento = models.CharField(max_length = 1, choices = DOCUMENTOS, default = 'B')
  numero_documento = models.CharField(max_length = 60)
  fecha_documento = models.DateField()
  vendedor = models.ForeignKey(User)
  cliente = models.CharField(max_length=100, blank=True, null=True)
  total_venta = models.DecimalField(max_digits = 10, decimal_places = 2, default = Decimal('0.00'))

class VentaDetalle(models.Model):
  registro_padre = models.ForeignKey(Venta)
  producto = models.ForeignKey('core.Producto')
  precio_unitario = models.DecimalField(max_digits = 10, decimal_places = 2, default = Decimal('0.00'))
  cantidad = models.IntegerField()
  #descuento = models.FloatField(default=0)
  precio_venta = models.DecimalField(max_digits = 10, decimal_places = 2, default = Decimal('0.00'))
