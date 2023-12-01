from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("shopping_cart_app.urls.user_urls")),
    path("api/categories/", include("shopping_cart_app.urls.category_urls")),
    path("api/products/", include("shopping_cart_app.urls.product_urls")),
    path("api/orders/", include("shopping_cart_app.urls.order_urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
