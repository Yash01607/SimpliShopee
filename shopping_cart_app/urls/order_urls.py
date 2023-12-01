from django.urls import path

from shopping_cart_app.views import order_views


urlpatterns = [
    path("cart/get/", order_views.getCart, name="cart"),
    path(
        "create/address/<int:addressId>/",
        order_views.createOrder,
        name="createOrder",
    ),
    path(
        "cart/add/product/<int:productId>/qty/<int:qty>/",
        order_views.addItemToCart,
        name="addItemToCart",
    ),
    path(
        "cart/delete/item/<int:cartItemId>/",
        order_views.removeItemToCart,
        name="removeItemToCart",
    ),
    path(
        "cart/update/item/<int:cartItemId>/qty/<int:qty>/",
        order_views.updateQtyOfItemInCart,
        name="updateQtyOfItemInCart",
    ),
    path(
        "id/<int:orderId>",
        order_views.getOrderbyId,
        name="getOrderbyId",
    ),
    path(
        "history/",
        order_views.getUserOrderList,
        name="getUserOrderList",
    ),
    path(
        "list/",
        order_views.getAllOrderList,
        name="getAllOrderList",
    ),
    path(
        "status/orderId/<int:orderId>/status/<str:order_status>/",
        order_views.updateOrderStatus,
        name="updateOrderStatus",
    ),
]
