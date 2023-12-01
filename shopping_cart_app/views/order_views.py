from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import TokenAuthentication

from shopping_cart_app.models import (
    Cart,
    Order,
    AddressModel,
    OrderItem,
    Product,
    CartItem,
)

from shopping_cart_app.Serializers.order_serializers import (
    CartSerializer,
    OrderSerializer,
)


@api_view(["GET"])
def orderApiOverview(request):
    api_urls = {}

    return Response(api_urls)


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getCart(request):
    try:
        user = request.user
        cart, created = Cart.objects.get_or_create(user=user)
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except:
        return Response(
            {
                "details": "Unable to Fetch Cart. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def addItemToCart(request, productId, qty):
    try:
        user = request.user
        cart = Cart.objects.get(user=user)
        product = Product.objects.get(id=productId)

        cartItemExists = CartItem.objects.filter(cart=cart, product=product).first()

        if qty <= 0:
            return Response(
                {"details": "Product quantity cannot be 0."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if cartItemExists:
            cartItemExists.quantity += qty
            cartItemExists.save()
        else:
            newCartItem = CartItem(cart=cart, product=product, quantity=qty)
            newCartItem.save()

        return Response(
            {"details": "Product Added Successfully"}, status=status.HTTP_200_OK
        )

    except:
        return Response(
            {
                "details": "Unable to Add Product to Cart. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def removeItemToCart(request, cartItemId):
    try:
        user = request.user
        try:
            cartItem = CartItem.objects.get(id=cartItemId)
        except:
            return Response(
                {"details": "Invalid CartItem Id. CartItem does not exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user == cartItem.cart.user:
            if cartItem:
                cartItem.delete()
            return Response(
                {"details": "Cart Item deleted Successfully"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    "details": "You are not allowed to delete this Item from cart. This cart belongs to someone else"
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

    except:
        return Response(
            {
                "details": "Unable to delete Product from Cart. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateQtyOfItemInCart(request, cartItemId, qty):
    try:
        user = request.user
        try:
            cartItem = CartItem.objects.get(id=cartItemId)
        except:
            return Response(
                {"details": "Invalid CartItem Id. CartItem does not exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if qty <= 0:
            return Response(
                {"details": "Product quantity cannot be 0."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user == cartItem.cart.user:
            cartItem.quantity = qty
            cartItem.save()

            return Response(
                {"details": "Cart Item Quantity Updated Successfully"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "details": "You are not allowed to update quantity in this cart. This cart belongs to someone else"
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

    except:
        return Response(
            {
                "details": "Unable to update quantity in Cart. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createOrder(request, addressId):
    try:
        try:
            user = request.user
            cart = Cart.objects.get(user=user)
            address = AddressModel.objects.get(id=addressId)
        except AddressModel.DoesNotExist:
            return Response(
                {
                    "details": "This address does not exists. Please enter a valid address"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Cart.DoesNotExist:
            return Response(
                {"details": "This Cart does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if address.user == user:
            order = Order.objects.create(user=user, shipping_address=address)

            for cartItem in cart.cartItems.all():
                orderItem = OrderItem.objects.create(
                    order=order, product=cartItem.product, quantity=cartItem.quantity
                )

            order.save()

            if cart.user == request.user:
                cart.cartitem_set.all().delete()

            serializer = OrderSerializer(order)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {
                    "details": "This address does not belong to your profile. Please enter a valid address"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    except:
        return Response(
            {
                "details": "Unable to Create Order. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUserOrderList(request):
    try:
        user = request.user
        order = Order.objects.filter(user=user).order_by("-order_date")

        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except:
        return Response(
            {
                "details": "Unable to get Orders. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getOrderbyId(request, orderId):
    try:
        user = request.user

        try:
            order = Order.objects.get(id=orderId)
        except:
            return Response(
                {"details": "Invalid Order ID. Order does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {
                    "details": "You are not allowed to access this order. This order belongs to someone else"
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

    except:
        return Response(
            {
                "details": "Unable to Fetch Order. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def getAllOrderList(request):
    try:
        order = Order.objects.all().order_by("-order_date")

        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except:
        return Response(
            {
                "details": "Unable to Fetch Orders. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def updateOrderStatus(request, orderId, order_status):
    try:
        try:
            order = Order.objects.get(id=orderId)
        except:
            return Response(
                {"details": "Invalid Order ID. Order does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        STATUS_CHOICES = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Canceled",
        ]

        if order_status not in STATUS_CHOICES:
            return Response(
                {"details": "The status value in invalid."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        order.order_status = order_status
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except:
        return Response(
            {
                "details": "Unable to Update Order status. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
