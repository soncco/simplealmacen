# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User
from decimal import *

class Producto(models.Model):
  codigo = models.CharField(max_length = 255)
  producto = models.CharField(max_length = 255)
  unidad_caja = models.IntegerField()
  #precio_caja = models.DecimalField(max_digits = 10, decimal_places = 2, default = Decimal('0.00'))
  precio_unidad = models.DecimalField(max_digits = 10, decimal_places = 2, default = Decimal('0.00'))
  #precio_credito = models.DecimalField(max_digits = 10, decimal_places = 2, default = Decimal('0.00'))
  #precio_contado = models.DecimalField(max_digits = 10, decimal_places = 2, default = Decimal('0.00'))
  activo = models.BooleanField(default = True)

  def __unicode__(self):
    return self.producto

class Proveedor(models.Model):
  razon_social = models.CharField(max_length = 255)
  ruc = models.CharField(max_length = 11)
  direccion = models.CharField(max_length = 100)
  ciudad = models.CharField(max_length = 100)
  distrito = models.CharField(max_length = 100)
  telefono = models.CharField(max_length = 50, blank = True)

  class Meta:
    verbose_name = ('Proveedor')
    verbose_name_plural = ('Proveedores')

  def __unicode__(self):
    return self.razon_social

class Gasto(models.Model):
  almacen = models.ForeignKey('almacen.Almacen')
  quien = models.ForeignKey(User)
  fecha = models.DateField()
  monto = models.DecimalField(max_digits = 10, decimal_places = 2, default = Decimal('0.00'))
  razon = models.TextField()
