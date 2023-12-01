from rest_framework import serializers
from shopping_cart_app.models import (
    Cart,
    Order,
    CartItem,
    Product,
    AddressModel,
    CustomUser,
)


class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = fields = [
            "name",
            "brand",
            "price",
            "image",
            "id",
        ]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductViewSerializer()
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = CartItem
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    cartItems = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Cart
        fields = "__all__"


class OrderItemSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    product = ProductViewSerializer()
    quantity = serializers.IntegerField()
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressModel
        fields = "__all__"


class UserOrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "name",
        ]


class OrderSerializer(serializers.ModelSerializer):
    orderItems = OrderItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    shipping_address = serializers.StringRelatedField()
    user = UserOrderSerializer()

    class Meta:
        model = Order
        fields = "__all__"
