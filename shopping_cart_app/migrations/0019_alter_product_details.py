# Generated by Django 4.2.6 on 2023-10-27 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping_cart_app', '0018_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='details',
            field=models.JSONField(blank=True, null=True, verbose_name='Product details'),
        ),
    ]
