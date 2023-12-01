from django.contrib.auth.forms import UserCreationForm
from shopping_cart_app.models import CustomUser


class Signup_Form(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ("email", "password1", "password2", "name", "username")
        extra_kwargs = {
            "password1": {"write_only": True},
            "password2": {"write_only": True},
        }
