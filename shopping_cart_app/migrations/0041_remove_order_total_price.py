# Generated by Django 4.2.6 on 2023-11-06 11:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shopping_cart_app', '0040_alter_orderitem_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='total_price',
        ),
    ]
