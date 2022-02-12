from django.urls import path
from django.views.decorators.cache import never_cache
from . import views

urlpatterns = [
    path('', never_cache(views.MainPageView.as_view()), name='index'),
    path('cart/', views.CartView.as_view(), name='cart'),
    path('thx/', views.OrderConfirmView.as_view(), name='thx'),
]
