# Generated by Django 4.2.6 on 2023-11-06 10:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shopping_cart_app', '0028_alter_order_total_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='shipping_address',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='shopping_cart_app.addressmodel'),
        ),
    ]
