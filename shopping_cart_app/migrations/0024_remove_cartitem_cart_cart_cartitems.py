# Generated by Django 4.2.6 on 2023-11-06 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping_cart_app', '0023_remove_cart_products'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartitem',
            name='cart',
        ),
        migrations.AddField(
            model_name='cart',
            name='cartItems',
            field=models.ManyToManyField(to='shopping_cart_app.cartitem'),
        ),
    ]
