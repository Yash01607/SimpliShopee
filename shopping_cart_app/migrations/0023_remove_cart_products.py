# Generated by Django 4.2.6 on 2023-11-06 08:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shopping_cart_app', '0022_cart_alter_product_category_cartitem_cart_products_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='products',
        ),
    ]
