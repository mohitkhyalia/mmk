from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(product_info)
admin.site.register(coupon)
admin.site.register(payment_info)
admin.site.register(user_info)
admin.site.register(Order)
admin.site.register(cart)
admin.site.register(Sale)