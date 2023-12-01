from django.urls import path

from shopping_cart_app.views import category_views


urlpatterns = [
    path("list/", category_views.getCategoriesList, name="categoriesList"),
    path("get/<int:category_id>/", category_views.getCategory, name="category"),
    path("add/", category_views.addCategory, name="addCategory"),
    path(
        "delete/<int:category_id>/",
        category_views.deleteCategory,
        name="deleteCategory",
    ),
    path(
        "update/<int:category_id>/",
        category_views.updateCategory,
        name="updateCategory",
    ),
    path(
        "subcategories/<category_id>/",
        category_views.getSubCategories,
        name="updateCategory",
    ),
    path("subcategory/add/", category_views.addSubCategory, name="addSubCategory"),
    path(
        "subcategory/delete/<int:subCategory_id>/",
        category_views.deleteSubCategory,
        name="deleteSubCategory",
    ),
    path("", category_views.categoryApiOverview, name="categoryApiOverview"),
]
