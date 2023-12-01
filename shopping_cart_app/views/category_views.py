from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import TokenAuthentication

from shopping_cart_app.models import Category, Subcategory

from shopping_cart_app.Serializers.category_serializers import (
    CategorySerializer,
    SubCategorySerializer,
)


@api_view(["GET"])
def categoryApiOverview(request):
    api_urls = {
        "Category List": "http://127.0.0.1:8000/api/categories/categorylist",
        "Add Category": "http://127.0.0.1:8000/api/categories/add",
        "Delete Category": "http://127.0.0.1:8000/api/categories/delete/<id>",
        "Update Category": "http://127.0.0.1:8000/api/categories/update/<id>",
        "Get Category": "http://127.0.0.1:8000/api/categories/getcategory/<id>",
    }

    return Response(api_urls)


@api_view(["GET"])
def getCategoriesList(request):
    try:
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(
            {
                "details": "Unable to Fetch Categories. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
def getCategory(request, category_id):
    try:
        try:
            category = Category.objects.get(id=category_id)
        except:
            return Response(
                {"details": "The requested category does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = CategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(
            {
                "details": "Unable to Fetch Category. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
def getSubCategories(request, category_id):
    try:
        if category_id.isdigit():
            category = Category.objects.get(id=category_id)

        else:
            category = Category.objects.get(name=category_id)

        subCategories = category.subcategory_set.all()
        serializer = SubCategorySerializer(subCategories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except:
        return Response(
            {
                "details": "Unable to Fetch SubCategories. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def addCategory(request):
    try:
        if request.method == "POST":
            serializer = CategorySerializer(data=request.data)

            if serializer.is_valid():
                category = serializer.save()

                if category is not None:
                    Subcategory.objects.create(
                        name=f"{category.name}", category=category
                    )

                    return Response(
                        {"details": "Category created successfully"},
                        status=status.HTTP_201_CREATED,
                    )
                else:
                    return Response(
                        {
                            "details": "There was an error in creating category. please try again"
                        },
                        status=status.HTTP_502_BAD_GATEWAY,
                    )
            else:
                data = serializer.errors
                return JsonResponse(
                    data, safe=False, status=status.HTTP_400_BAD_REQUEST
                )
    except:
        return Response(
            {"details": "Unable to Create Category. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def deleteCategory(request, category_id):
    try:
        if request.method == "DELETE":
            category = get_object_or_404(Category, pk=category_id)
            category.delete()
            return Response(
                {"details": "Category Delete Successfully"},
                status=status.HTTP_200_OK,
            )
    except:
        return Response(
            {"details": "Unable to Delete Category. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PUT"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def updateCategory(request, category_id):
    try:
        if request.method == "PUT":
            try:
                category = Category.objects.get(id=category_id)
            except Category.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            serializer = CategorySerializer(category, data=request.data)

            if serializer.is_valid():
                category = serializer.save()

                if category is not None:
                    return Response(
                        {"details": "Category Updated successfully"},
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {
                            "details": "There was an error in updating category. please try again"
                        },
                        status=status.HTTP_502_BAD_GATEWAY,
                    )
            else:
                data = serializer.errors
                return JsonResponse(
                    data, safe=False, status=status.HTTP_400_BAD_REQUEST
                )

    except:
        return Response(
            {"details": "Unable to Update Category. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def addSubCategory(request):
    try:
        if request.method == "POST":
            serializer = SubCategorySerializer(data=request.data)

            if serializer.is_valid():
                subCategory = serializer.save()

                if subCategory is not None:
                    return Response(
                        {"details": "Sub Category created successfully"},
                        status=status.HTTP_201_CREATED,
                    )
                else:
                    return Response(
                        {
                            "details": "There was an error in creating sub-category. please try again"
                        },
                        status=status.HTTP_502_BAD_GATEWAY,
                    )
            else:
                data = serializer.errors
                return JsonResponse(
                    data, safe=False, status=status.HTTP_400_BAD_REQUEST
                )
    except:
        return Response(
            {"details": "Unable to Create Sub-Category. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def deleteSubCategory(request, subCategory_id):
    try:
        if request.method == "DELETE":
            subCategory = get_object_or_404(Subcategory, pk=subCategory_id)
            subCategory.delete()
            return Response(
                {"details": "SubCategory Delete Successfully"},
                status=status.HTTP_200_OK,
            )
    except:
        return Response(
            {"details": "Unable to Delete SubCategory. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
