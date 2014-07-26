from django.conf.urls import patterns, include, url

from rest_framework import routers
from views import ProductoViewSet, ProductoFilterList, ProveedorViewSet, ProveedorFilterList

router = routers.DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'proveedores', ProveedorViewSet)

urlpatterns = patterns('core.views',
  # Rest API
  url(r'^api/core/', include(router.urls)),
  url(r'^api/productos-filter/$', ProductoFilterList.as_view()),
  url(r'^api/proveedores-filter/$', ProveedorFilterList.as_view()),
)