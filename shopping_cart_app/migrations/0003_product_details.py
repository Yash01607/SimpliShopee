# Generated by Django 4.2.6 on 2023-10-19 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping_cart_app', '0002_category_subcategory_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='details',
            field=models.TextField(blank=True),
        ),
    ]
