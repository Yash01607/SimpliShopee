from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render


def render_react(request):
    return render(request, "index.html")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("shopping_cart_app.urls.user_urls")),
    path("api/categories/", include("shopping_cart_app.urls.category_urls")),
    path("api/products/", include("shopping_cart_app.urls.product_urls")),
    path("api/orders/", include("shopping_cart_app.urls.order_urls")),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r"^$", render_react)]
urlpatterns += [re_path(r"^(?:.*)/?$", render_react)]
