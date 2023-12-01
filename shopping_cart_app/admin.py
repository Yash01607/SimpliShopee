from django.contrib import admin
from shopping_cart_app.models import (
    AddressModel,
    CustomUser,
    Product,
    Category,
    Subcategory,
    Cart,
    CartItem,
    MyImage,
    Order,
    OrderItem,
)

admin.site.register(AddressModel)
admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(MyImage)
admin.site.register(OrderItem)
admin.site.register(Order)
