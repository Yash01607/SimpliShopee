from rest_framework import serializers
from shopping_cart_app.models import Product, Subcategory, MyImage


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyImage
        fields = ("image",)


class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = fields = [
            "name",
            "description",
            "brand",
            "price",
            "details",
            "category",
            "image",
            "id",
        ]


class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = fields = [
            "name",
            "description",
            "brand",
            "price",
            "details",
            "category",
            "image",
            "subcategories",
            "id",
        ]


class ProductListSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    next = serializers.CharField(allow_blank=True)
    previous = serializers.CharField(allow_blank=True)
    results = serializers.ListField(child=ProductViewSerializer())
