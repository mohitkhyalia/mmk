from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class product_info(models.Model):
    name=models.CharField(max_length=50)
    price=models.IntegerField()
    dec=models.CharField(max_length=254)
    image=models.CharField(max_length=500)
    imageone=models.CharField(max_length=500)
    imagetwo=models.CharField(max_length=500)
    imagethree=models.CharField(max_length=500)
    size=models.CharField(max_length=150)
    cato=models.CharField(max_length=150)
    sale=models.BooleanField(default=False)
    rating=models.IntegerField()
    discount=models.IntegerField()
    featured=models.BooleanField(default=True)  

class coupon(models.Model):
    code=models.CharField(max_length=50)
    off=models.IntegerField()
    vallidon=models.BooleanField(default=True) 

class cart(models.Model):
    user_id=models.IntegerField()
    items=models.JSONField()

class Sale(models.Model):
    name = models.CharField(max_length=100)
    end_date = models.DateField()
    start_date = models.DateField()
    sale = models.BooleanField(default=False)
    off=models.IntegerField(default=10)
    objects = models.Manager()


class Order(models.Model):
    user_email = models.CharField(max_length=100)
    product_name = models.CharField(max_length=100)
    order_amount = models.CharField(max_length=25)
    isPaid = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name




class UserInfoManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('staff', True)
        return self.create_user(email, password, **extra_fields)

class user_info(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=50)
    mob = models.IntegerField()
    gen = models.CharField(max_length=2)
    email = models.EmailField(max_length=500, unique=True)
    password = models.CharField(max_length=500)
    addr = models.CharField(max_length=500)
    pincode = models.CharField(max_length=500)
    country = models.CharField(max_length=150, default='india')
    noti = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserInfoManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'mob']  # Add other required fields here

    def __str__(self):
        return self.email



class payment_info(models.Model):
    user = models.ForeignKey(user_info, on_delete=models.CASCADE)
    name=models.CharField(max_length=50)
    amount=models.IntegerField()
    date=models.DateField()

def __str__(self):
    return self.name