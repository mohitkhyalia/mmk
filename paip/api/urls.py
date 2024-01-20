from django.urls import path
from pbackend.views import *
urlpatterns = [
    path('product/',product),
    path('coupon/',coupons.as_view()),
    path('user/',user.as_view()),
    path('sale/',sale.as_view()),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('check',check.as_view(),name="check"),
    path('pay/', start_payment, name="start_payment"),
    path('handlepayment/', handlepayment, name="handlepayment"),
    path('cart/', CartDetailView.as_view(), name='cart-detail'),
    path('getcart/', getcartda.as_view()),
]