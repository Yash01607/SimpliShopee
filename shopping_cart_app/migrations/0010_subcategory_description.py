# Generated by Django 4.2.6 on 2023-10-25 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping_cart_app', '0009_product_subcategories'),
    ]

    operations = [
        migrations.AddField(
            model_name='subcategory',
            name='description',
            field=models.TextField(blank=True, verbose_name='SubCategory description'),
        ),
    ]
