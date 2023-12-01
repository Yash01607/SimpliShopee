import json
from django.db import models
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination

from shopping_cart_app.models import Product, Subcategory, Category
from shopping_cart_app.Serializers.product_serializers import (
    ProductCreateSerializer,
    ProductViewSerializer,
)


def paginateProductList(products, request):
    # Create a PageNumberPagination instance
    paginator = PageNumberPagination()

    # Paginate the products using the paginator
    paginated_products = paginator.paginate_queryset(products, request)

    # Serialize the paginated products using the ProductViewSerializer
    serializer = ProductViewSerializer(paginated_products, many=True)

    # Create a response dictionary containing pagination information and serialized products
    response = {
        "count": paginator.page.paginator.count,  # Total number of items across all pages
        "next": paginator.get_next_link(),  # Link to the next page or None if no next page
        "previous": paginator.get_previous_link(),  # Link to the previous page or None if no previous page
        "products": serializer.data,  # Serialized data of the paginated products
    }

    return response


@api_view(["GET"])
def productApiOverview(request):
    api_urls = {
        "Product List": "http://127.0.0.1:8000/api/products/productlist",
    }

    return Response(api_urls)


@api_view(["GET"])
def getProductList(request):
    try:
        # Get the optional orderby parameter from the query string or default to "-createdAt"
        order_by = (
            request.GET.get("orderby") if request.GET.get("orderby") else "-createdAt"
        )

        # Query all products, order them by "updatedAt", and then by the specified order_by field
        products = Product.objects.all().order_by(order_by)

        # Paginate the products using your paginateProductList utility function
        response = paginateProductList(products=products, request=request)

        # Return the paginated response with HTTP 200 OK status
        return Response(
            response,
            status=status.HTTP_200_OK,
        )
    except:
        # Handle exceptions and return an error response with HTTP 500 Internal Server Error status
        return Response(
            {
                "details": "Unable to Fetch Products. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
def getProductById(request, product_id):
    try:
        # Attempt to retrieve the product with the specified ID
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            # Return a 404 Not Found response if the product does not exist
            return Response(
                {"details": "The requested product does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Serialize the product using your ProductViewSerializer
        serializer = ProductViewSerializer(product)

        # Return the serialized product data with HTTP 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)

    except:
        # Handle exceptions and return an error response with HTTP 500 Internal Server Error status
        return Response(
            {
                "details": "Unable to Fetch Product. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
def getFilteredProducts(request):
    try:
        # Extract filters from the request data
        filters = request.data["filters"]

        # Extract filter criteria from the filters dictionary, handling empty strings appropriately

        filterCondition = models.Q()

        subcategory_ids = (
            filters["subcategory_name"]
            if "subcategory_name" in filters
            and filters["subcategory_name"] != ""
            and filters["subcategory_name"] != " "
            else ""
        )
        if subcategory_ids is not None and subcategory_ids != "":
            subcategory_ids = list(map(int, subcategory_ids.split(",")))
            subcategories = Subcategory.objects.filter(id__in=subcategory_ids)

            filterCondition &= models.Q(subcategories__in=subcategories)

        # subcategory_name = (
        #     filters["subcategory_name"]
        #     if "subcategory_name" in filters
        #     and filters["subcategory_name"] != ""
        #     and filters["subcategory_name"] != " "
        #     else ""
        # )
        # print("subcategory_name",subcategory_name)
        # if subcategory_name is not None:
        #     filterCondition &= models.Q(subcategories__name__icontains=subcategory_name)

        category_name = (
            filters["category_name"]
            if "category_name" in filters
            and filters["category_name"] != ""
            and filters["category_name"] != " "
            else ""
        )
        if category_name is not None:
            filterCondition &= models.Q(category__name__icontains=category_name)

        search_string = (
            filters["search_string"]
            if "search_string" in filters
            and filters["search_string"] != ""
            and filters["search_string"] != " "
            else ""
        )
        if search_string is not None:
            filterCondition &= (
                models.Q(name__icontains=search_string)
                | models.Q(description__icontains=search_string)
                | models.Q(details__icontains=search_string)
                | models.Q(brand__icontains=search_string)
            )

        brand = (
            filters["brand"]
            if "brand" in filters and filters["brand"] != "" and filters["brand"] != " "
            else ""
        )
        if brand is not None:
            filterCondition &= models.Q(brand__icontains=brand)

        min_price = (
            int(filters["min_price"])
            if "min_price" in filters
            and filters["min_price"] != ""
            and filters["min_price"] != " "
            else 0
        )
        if min_price is not None:
            filterCondition &= models.Q(price__gte=min_price)

        max_price = (
            int(filters["max_price"])
            if "max_price" in filters
            and filters["max_price"] != ""
            and filters["max_price"] != " "
            else 9999999999
        )
        if max_price is not None:
            filterCondition &= models.Q(price__lte=max_price)

        order_by = (
            filters["order_by"]
            if "order_by" in filters
            and filters["order_by"] != ""
            and filters["order_by"] != " "
            else "-createdAt"
        )

        # Filter products based on the specified criteria
        products = Product.objects.filter(filterCondition).distinct().order_by(order_by)

        # Paginate the filtered products using your paginateProductList utility function
        response = paginateProductList(products, request)

        # Return the paginated response with HTTP 200 OK status
        return Response(response, status=status.HTTP_200_OK)

    except Exception as e:
        # Handle exceptions and return an error response with HTTP 500 Internal Server Error status
        print(e)
        return Response(
            {
                "details": "Unable to Fetch Product. Internal Server error. Please try again"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


def validateSubCategories(subCategoryIds):
    try:
        # Attempt to get the first subcategory using the first ID in the list
        first_subcategory = Subcategory.objects.get(id=subCategoryIds[0])
    except Subcategory.DoesNotExist:
        # Raise a ValueError if the first subcategory does not exist
        raise ValueError("Requested Subcategory does not exist")

    # Filter subcategories based on the provided IDs
    subcategories = Subcategory.objects.filter(id__in=subCategoryIds)

    # Check if all subcategories have the same category as the first subcategory
    same_category = all(
        Subcategory.objects.filter(
            name=subcategory.name, category=first_subcategory.category
        ).exists()
        for subcategory in subcategories
    )

    # Raise a ValueError if the subcategories do not belong to the same category
    if not same_category:
        raise ValueError("Category of all SubCategories must be the same.")


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def addProduct(request):
    try:
        # Make updating request data possible
        request.data._mutable = True

        try:
            # Validate the list of subcategories
            if len(request.data["subcategoryIds"]) > 0:
                # Extract subcategories from a string of comma seperated list of ids
                subcategories = request.data["subcategoryIds"].split(",")

                # Convert the id from char to int
                subcategoriesIdList = [int(i) for i in subcategories]

                # Make sure the list of subcategories belongs to same category
                validateSubCategories(subCategoryIds=subcategoriesIdList)
        except:
            # Return an error response if the subcategories are not valid
            return Response(
                {
                    "details": "Please send a valid list of subcategories. All subcategories must belong to same category."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # Use the ProductCreateSerializer to create a new product
        serializer = ProductCreateSerializer(data=request.data)

        if serializer.is_valid():
            product = serializer.save()

            # Add subcategories to the newly created product
            if len(request.data["subcategoryIds"]) > 0:
                for id in subcategoriesIdList:
                    subcategory = Subcategory.objects.get(id=id)
                    product.subcategories.add(subcategory)

            # Return the serialized product data with HTTP 201 Created status
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        else:
            # Return validation errors if the serializer is not valid
            data = serializer.errors
            return JsonResponse(data, safe=False, status=status.HTTP_400_BAD_REQUEST)

    except:
        # Handle exceptions and return an error response with HTTP 500 Internal Server Error status
        return Response(
            {"details": "Unable to Create Product. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PATCH"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def updateProduct(request, product_id):
    try:
        if request.method == "PATCH":
            request.data._mutable = True

            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            try:
                if len(request.data["subcategoryIds"]) > 0:
                    subcategories = request.data["subcategoryIds"].split(",")
                    subcategoriesIdList = [int(i) for i in subcategories]
                    validateSubCategories(subCategoryIds=subcategoriesIdList)
            except:
                return Response(
                    {"details": "Please send a valid list of subcategories"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            serializer = ProductCreateSerializer(
                product, data=request.data, partial=True
            )

            if serializer.is_valid():
                product = serializer.save()
                if product is not None:
                    if len(request.data["subcategoryIds"]) > 0:
                        product.subcategories.clear()
                        for id in subcategoriesIdList:
                            subcategory = Subcategory.objects.get(id=id)
                            product.subcategories.add(subcategory)

                    return Response(
                        serializer.data,
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {
                            "details": "There was an error in updating product. please try again"
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
            {"details": "Unable to Update Product. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def deleteProduct(request, product_id):
    try:
        if request.method == "DELETE":
            product = get_object_or_404(Product, pk=product_id)
            product.delete()
            return Response(
                {"details": "Product Deleted Successfully"},
                status=status.HTTP_200_OK,
            )
    except:
        return Response(
            {"details": "Unable to Delete Product. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
def getBrandList(request,category_name):
    try:
        try:
            category = Category.objects.get(name=category_name)
            brands =  Product.objects.filter(category=category).values_list("brand", flat=True).distinct()
            return Response(
                brands,
                status=status.HTTP_200_OK,
            ) 
        except:
            brands =  Product.objects.values_list("brand", flat=True).distinct()
            return Response(
                brands,
                status=status.HTTP_200_OK,
            )
    except Exception as e:
        print(e)
        return Response(
            {"details": "Unable to Fetch Brand List at the moment. Please try again"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
