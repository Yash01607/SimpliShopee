from django.contrib.auth import login, authenticate, logout
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from shopping_cart_app.forms.user_forms import Signup_Form
from django.http import JsonResponse

from shopping_cart_app.models import AddressModel, CustomUser, Cart

from shopping_cart_app.Serializers.user_serializers import (
    UserSerializer,
    # SignUpSerializer,
    LoginSerializer,
    AddressSerializers,
    # ChangePasswordSerializer,
)
from django.contrib.auth.forms import UserCreationForm, PasswordResetForm


# view for an api overviews of users actions
@api_view(["GET"])
def userApiOverview(request):
    api_urls = {
        "Profile": "http://127.0.0.1:8000/api/users/getprofile",
        "Signup": "http://127.0.0.1:8000/api/users/signup",
        "Login": "http://127.0.0.1:8000/api/users/login",
        "Logout": "http://127.0.0.1:8000/api/users/logout",
        "Forgot Password": "http://127.0.0.1:8000/api/users/forgotpassword",
    }

    return Response(api_urls)


# Specifying api type
@api_view(["GET"])
# Using rest token authentication
@authentication_classes([TokenAuthentication])
# decorator to check user authentication
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    try:
        # Get user details from request object
        user = request.user
        # serialize data using serializers
        serializer = UserSerializer(user)
        # Return serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(
            {"details": "Unable to Get User Profile. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# Specifying api type
@api_view(["POST"])
# Using rest token authentication
@authentication_classes([TokenAuthentication])
# decorator to check user authentication
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    try:
        user = request.user
        data = request.data
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
    except:
        return Response(
            {"details": "Unable to Update User Profile. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# Only allow POST requests
@api_view(["POST"])
def signupUser(request):
    try:
        # Create a Signup_Form instance with the request data
        form = Signup_Form(request.data)

        # Check if the form is valid
        if form.is_valid():
            # Save the user and get the saved user instance
            user = form.save()

            cart, created = Cart.objects.get_or_create(user=user)

            # Prepare response data with email and name
            data = {
                "email": form.cleaned_data["email"],
                "name": form.cleaned_data["name"],
            }

            # Return a success response (HTTP 201 Created)
            return JsonResponse(data=data, safe=False, status=status.HTTP_201_CREATED)
        else:
            # If the form is not valid, return validation errors (HTTP 400 Bad Request)
            data = form.errors.as_json()
            return JsonResponse(data, safe=False, status=status.HTTP_400_BAD_REQUEST)
    except:
        # Handle unexpected exceptions and return a generic error response (HTTP 500 Internal Server Error)
        return Response(
            {"details": "Unable to Register. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
def loginUser(request):
    try:
        # Extract data from the request
        data = request.data

        # Check if the request method is POST
        if request.method == "POST":
            # Create a LoginSerializer instance with the request data
            serializer = LoginSerializer(data=data)

            # Check if the serializer is valid
            if serializer.is_valid():
                # Extract email and password from the validated data
                email = serializer.validated_data["email"]
                password = serializer.validated_data["password"]

                # Authenticate the user using Django's authenticate method
                user = authenticate(request, username=email, password=password)

                # Check if authentication was successful
                if user is not None:
                    # Log in the user
                    login(request, user)

                    # Generate or retrieve an authentication token for the user
                    token, created = Token.objects.get_or_create(user=user)

                    # Return a success response with user details and token (HTTP 200 OK)
                    return Response(
                        {
                            "token": token.key,
                            "email": email,
                            "name": user.name,
                            "id": user.id,
                            "isAdmin": user.is_staff,
                        },
                        status=status.HTTP_200_OK,
                    )
                else:
                    # Return an error response for invalid credentials (HTTP 401 Unauthorized)
                    return Response(
                        {"error": "Invalid credentials"},
                        status=status.HTTP_401_UNAUTHORIZED,
                    )

            # Return a response with serializer errors for invalid data (HTTP 400 Bad Request)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except:
        # Handle unexpected exceptions and return a generic error response (HTTP 500 Internal Server Error)
        return Response(
            {"details": "Unable to Login. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
# Use TokenAuthentication for authentication
@authentication_classes([TokenAuthentication])
# Ensure the user is authenticated
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Delete the authentication token associated with the user
        request.user.auth_token.delete()

        # Return a success response indicating successful logout (HTTP 200 OK)
        return Response({"details": "Successful"}, status=status.HTTP_200_OK)
    except:
        # Handle exceptions and return an error response for unsuccessful logout (HTTP 401 Unauthorized)
        return Response(
            {"details": "Unable to logout"}, status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(["POST"])
def forgotPassword(request):
    try:
        # Extract data from the request
        email = request.data["email"]
        new_password = request.data["new_password"]
        confirm_password = request.data["confirm_password"]

        try:
            # Attempt to retrieve a user with the given email
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            # Return an error response if no user exists with the provided email
            return JsonResponse(
                {"error": "No user exists with this email address."}, status=400
            )

        # Check if the new password matches the confirm password
        if new_password == confirm_password:
            try:
                # Validate the strength of the new password
                validate_password(new_password)

                # Set the new password for the user and save the user instance
                user.set_password(new_password)
                user.save()

                # Return a success response for a successful password reset
                return JsonResponse({"message": "Password reset successfully."})
            except Exception as e:
                # Return an error response if password validation fails
                return JsonResponse(
                    {
                        "details": "Password is not strong enough. Password must be at least 8 characters long, contain a letter, number, and special character, and should not be similar to the email."
                    },
                    status=400,
                )
        else:
            # Return an error response if new password and confirm password do not match
            return Response(
                {"details": "New password and confirm password must be the same."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
    except Exception as e:
        # Handle unexpected exceptions and return a generic error response
        return Response(
            {
                "details": "Unable to reset password. Internal server error. Please try again later."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
# Use TokenAuthentication for authentication
@authentication_classes([TokenAuthentication])
# Ensure the user is authenticated
@permission_classes([IsAuthenticated])
def getAddressList(request):
    try:
        # Get the user from the request
        user = request.user

        # Retrieve all addresses associated with the user
        addresses = user.addresses.all()

        # Serialize the addresses using the AddressSerializers
        serializer = AddressSerializers(addresses, many=True)

        # Return a success response with the serialized address data (HTTP 200 OK)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        # Handle unexpected exceptions and return a generic error response (HTTP 500 Internal Server Error)
        return Response(
            {
                "details": "Unable to get addresses. Internal server error. Please try again later."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@authentication_classes(
    [TokenAuthentication]
)  # Use TokenAuthentication for authentication
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def addAddress(request):
    try:
        # Get the user from the request
        user = request.user

        # Create an AddressSerializers instance with the request data
        serializer = AddressSerializers(data=request.data)

        # Check if the serializer is valid
        if serializer.is_valid():
            # Check if the user ID in the request data matches the current user's ID
            if int(request.data["user"]) == user.id:
                # Save the serialized address and return a success response (HTTP 200 OK)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Return an error response for an invalid user ID (HTTP 400 Bad Request)
                return Response(
                    {"details": "Invalid user ID."}, status=status.HTTP_400_BAD_REQUEST
                )

        # Return a response with serializer errors for invalid data (HTTP 500 Internal Server Error)
        return Response(
            serializer.errors,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    except Exception as e:
        # Handle unexpected exceptions and return a generic error response (HTTP 500 Internal Server Error)
        return Response(
            {
                "details": "Unable to add addresses. Internal server error. Please try again later."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@authentication_classes(
    [TokenAuthentication]
)  # Use TokenAuthentication for authentication
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def deleteAddress(request, addressID):
    try:
        # Retrieve the AddressModel instance with the provided addressID or return a 404 response
        address = get_object_or_404(AddressModel, pk=addressID)

        # Check if the user ID associated with the address matches the current user's ID
        if int(address.user.id) == int(request.user.id):
            # Delete the address and return a success response (HTTP 200 OK)
            address.delete()
            return Response(
                {"details": "Address deleted successfully"},
                status=status.HTTP_200_OK,
            )
        else:
            # Return an error response for unauthorized access (HTTP 401 Unauthorized)
            return Response(
                {"details": "Unauthorized access."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    except Exception as e:
        # Handle unexpected exceptions and return a generic error response (HTTP 500 Internal Server Error)
        return Response(
            {
                "details": "Unable to delete address. Internal server error. Please try again later."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
