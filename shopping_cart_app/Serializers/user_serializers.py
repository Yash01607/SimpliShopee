from rest_framework import serializers
from shopping_cart_app.models import CustomUser, AddressModel


class UserSerializer(serializers.HyperlinkedModelSerializer):
    address = serializers.StringRelatedField()

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "address",
            "address",
        ]


class AddressSerializers(serializers.ModelSerializer):
    class Meta:
        model = AddressModel
        fields = "__all__"


class getUserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id"]


# class SignUpSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ("name", "password", "email", "id")
#         extra_kwargs = {"password": {"write_only": True}}

#     def create(self, validated_data):
#         user = CustomUser(
#             username=validated_data["email"],
#             email=validated_data["email"],
#             name=validated_data["name"],
#         )
#         user.set_password(validated_data["password"])
#         user.save()
#         return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)


# class ChangePasswordSerializer(serializers.Serializer):
#     model = CustomUser
#     old_password = serializers.CharField(required=True)
#     new_password = serializers.CharField(required=True)
#     confirm_password = serializers.CharField(required=True)
#     email = serializers.EmailField(required=True)
