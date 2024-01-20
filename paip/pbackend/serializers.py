from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_info
        fields = ['name', 'email', 'password','mob']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = user_info.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            password=validated_data['password'],
            mob=validated_data['mob']
        )
        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = product_info
        fields = '__all__'

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = coupon
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model =payment_info
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_info
        fields = '__all__'
    
class SaleSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(input_formats=['%Y-%m-%d'])
    end_date = serializers.DateField(input_formats=['%Y-%m-%d'])
    class Meta:
        model = Sale    
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    order_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = Order
        fields = '__all__'
        depth = 2


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = cart
        fields = '__all__'
    
    '''class Meta:
        model = cart
        fields = ['user_id', 'items']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['items'] = representation['items'] or []
        return representation'''