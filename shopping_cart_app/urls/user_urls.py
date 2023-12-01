from django.urls import path

from shopping_cart_app.views import user_views


urlpatterns = [
    path("", user_views.userApiOverview, name="api_overview"),
    path("profile/", user_views.getUserProfile, name="get_user_profile"),
    path("update/", user_views.updateUserProfile, name="updateUserProfile"),
    path("signup/", user_views.signupUser, name="signup"),
    path("login/", user_views.loginUser, name="login"),
    path("logout/", user_views.logout, name="logout"),
    path("address/list/", user_views.getAddressList, name="addresses"),
    path("address/add/", user_views.addAddress, name="addAddress"),
    path(
        "address/delete/<int:addressID>/",
        user_views.deleteAddress,
        name="deleteAddress",
    ),
    path("forgotpassword/", user_views.forgotPassword, name="forgotpassword"),
]
