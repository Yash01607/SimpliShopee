from django.urls import path

from shopping_cart_app.views import product_views


urlpatterns = [
    path("list/", product_views.getProductList, name="categoriesList"),
    path(
        "get/<int:product_id>/",
        product_views.getProductById,
        name="getProductById",
    ),
    path(
        "filtered/",
        product_views.getFilteredProducts,
        name="getProductByCategory",
    ),
    path("add/", product_views.addProduct, name="add Product"),
    path(
        "update/<int:product_id>/",
        product_views.updateProduct,
        name="updateProduct",
    ),
    path(
        "delete/<int:product_id>/",
        product_views.deleteProduct,
        name="deleteProduct",
    ),
    path("brands/<str:category_name>", product_views.getBrandList, name="brandList"),
    path("", product_views.productApiOverview, name="productApiOverview"),
]
