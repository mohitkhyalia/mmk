# Generated by Django 4.1.5 on 2023-11-04 10:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pbackend', '0002_coupon'),
    ]

    operations = [
        migrations.CreateModel(
            name='user_info',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('mob', models.IntegerField()),
                ('gen', models.CharField(max_length=2)),
                ('email', models.EmailField(max_length=500)),
                ('password', models.CharField(max_length=500)),
                ('addr', models.CharField(max_length=500)),
                ('pincode', models.CharField(max_length=500)),
                ('country', models.CharField(default='india', max_length=150)),
                ('noti', models.BooleanField(default=True)),
                ('staff', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='payment_info',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('amount', models.IntegerField()),
                ('date', models.DateField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pbackend.user_info')),
            ],
        ),
    ]
