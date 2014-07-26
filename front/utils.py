from datetime import datetime

def total_gastos(gastos):
  total = 0
  for gasto in gastos:
    total += gasto.monto

  return total

def total_contados(contados):
  total = 0
  for contado in contados:
    total += contado.total_venta

  return total

def total_amortizacion(amortizaciones):
  total = 0
  for amortizacion in amortizaciones:
    total += amortizacion.monto

  return total

def total_liquidacion(gastos, contados):
  return contados - gastos

def strtotime(mystring):
  format = '%Y-%m-%d'
  return datetime.strptime(mystring, format)