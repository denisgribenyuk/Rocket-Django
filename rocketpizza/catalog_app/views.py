from typing import Any

from django.shortcuts import render, HttpResponseRedirect
from django.views import View
from .models import SiteData, Product, Category, ProductModificator
from django.db.models import QuerySet
from dataclasses import dataclass


# Create your views here.

class MainPageView(View):
    def get(self, request):
        @dataclass
        class Product_obj:
            id: int
            name: str
            price: [int, None]
            start_price: [int, None]
            description: str
            category: Any
            is_visible: bool
            image: str
            modificators: list
            modificators_without_price: list
        @dataclass
        class Category_obj:
            name: str
            is_visible: bool
            products: list[Product_obj]

        categories_group = []
        product_group = []
        products = Product.objects.all()
        categories = Category.objects.all()
        for prod in products:
            item = Product_obj(
                id=prod.id,
                price=prod.price,
                start_price=prod.start_price,
                description=prod.description,
                image=prod.image,
                category=prod.category,
                modificators=prod.modificator.all(),
                modificators_without_price=prod.modificator_no_price.all(),
                name=prod.name,
                is_visible=prod.is_visible
            )
            product_group.append(item)
        for cat in categories:
            item = Category_obj(
                name=cat.title,
                is_visible=cat.is_visible,
                products=[item for item in product_group if item.category == cat]
            )
            categories_group.append(item)
        site_data = SiteData.objects.get(id=1)

        return render(request, 'index.html', {'site_data': site_data, 'categories_group': categories_group})


class CartView(View):
    def post(self, request):
        request_data = request.POST
        print(request_data)
        return render(request, 'page-cart.html')


    def get(self, request):
        request_data = request
        print(request_data)
        return render(request, 'page-cart.html')


class OrderConfirmView(View):
    def get(self, request):
        return render(request, 'page-thx.html')
