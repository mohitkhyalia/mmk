# Generated by Django 4.1.5 on 2024-01-08 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pbackend', '0009_sale'),
    ]

    operations = [
        migrations.AddField(
            model_name='sale',
            name='off',
            field=models.IntegerField(default=10),
        ),
    ]