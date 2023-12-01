from decimal import Decimal
from django.db import models

from django.contrib.auth.models import AbstractUser

from django.core.validators import RegexValidator

from django.utils.translation import gettext as _


phone_regex = RegexValidator(
    regex=r"^\+?1?\d{9,15}$",
    message="Phone number must be entered in the format: '9999999999' of exactly 10 digits",
)
pincode_regex = RegexValidator(
    regex=r"^\+?1?\d{0,7}$",
    message="Phone number must be entered in the format: '999999'. Up to 6 digits allowed.",
)


class CustomUser(AbstractUser):
    phone = models.CharField(
        validators=[phone_regex], max_length=10, null=True, blank=True, unique=True
    )
    email = models.EmailField(_("email address"), unique=True)
    name = models.CharField(_("name"), max_length=200, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"{self.name} {self.username} - {self.email}"


class AddressModel(models.Model):
    """Model definition for AddressModel."""

    street = models.CharField(max_length=500)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    pincode = models.CharField(
        validators=[pincode_regex],
        max_length=7,
    )
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="addresses"
    )

    class Meta:
        """Meta definition for AddressModel."""

        verbose_name = "AddressModel"
        verbose_name_plural = "AddressModels"

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} - {self.pincode}"


class Category(models.Model):
    name = models.CharField(_("Category name"), max_length=100, unique=True)
    description = models.TextField(_("Category description"), blank=True)
    image = models.ImageField(
        _("Category Image"), upload_to="category_images/", blank=True, null=True
    )

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    name = models.CharField(_("Subcategory Name"), max_length=100, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Subcategories"

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(_("Product name"), max_length=100)
    description = models.TextField(_("Product description"), blank=True, null=True)
    brand = models.CharField(_("Product brand"), max_length=100, blank=True)
    price = models.DecimalField(
        _("Product price"), max_digits=10, decimal_places=2, db_index=True
    )
    details = models.JSONField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(
        _("Product Image"), upload_to="product_images/", null=True, blank=True
    )
    subcategories = models.ManyToManyField(Subcategory)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class MyImage(models.Model):
    my_model = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return self.image


class Cart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    @property
    def total_price(self):
        total = 0
        for item in self.cartitem_set.all():
            total += item.product.price * item.quantity
        return total

    def __str__(self):
        return f"{self.user.name}'s cart, Total - {self.total_price}"

    @property
    def cartItems(self):
        cartItems = self.cartitem_set.all()
        return cartItems


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(_("Quantity"), default=1)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)

    @property
    def total_price(self):
        return float(self.quantity * self.product.price)

    def __str__(self):
        return f"{self.product.name}, Qty - {self.quantity}"


STATUS_CHOICES = [
    ("Pending", "Pending"),
    ("Processing", "Processing"),
    ("Shipped", "Shipped"),
    ("Delivered", "Delivered"),
    ("Canceled", "Canceled"),
]


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    shipping_address = models.ForeignKey(
        AddressModel, on_delete=models.SET_NULL, null=True
    )
    order_status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending",
    )

    @property
    def total_price(self):
        total = 0.0
        for item in self.orderitem_set.all():
            total += item.total_price
        return total

    @property
    def orderItems(self):
        orderItems = self.orderitem_set.all()
        return orderItems

    def __str__(self):
        return f"Order #{self.pk}, By - {self.user.name}"


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(_("Quantity"), default=1)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    @property
    def total_price(self):
        return float(self.quantity * self.product.price)

    def __str__(self):
        return f"{self.product.name}, Qty - {self.quantity}"
