# Generated by Django 4.1.5 on 2023-12-26 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pbackend', '0008_cart_order'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('end_date', models.DateField()),
                ('start_date', models.DateField()),
                ('sale', models.BooleanField(default=False)),
            ],
        ),
    ]
