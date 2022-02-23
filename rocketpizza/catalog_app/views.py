import json
from typing import Any
import requests
from django.shortcuts import render, HttpResponseRedirect, redirect
from django.views import View
from django.http import JsonResponse
from .models import SiteData, Product, Category, ProductModificator, ProductModificatorWithoutPrice
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
        request_data = json.loads(request.body.decode('utf-8'))
        prods_in_cart = []
        total_price = 0
        for prod in request_data:
            name = Product.objects.get(id=prod['prod_id']).name
            id = prod['prod_id']
            price = Product.objects.get(id=prod['prod_id']).price
            try:
                mod = ProductModificator.objects.get(id=prod['mod_id']).name
                price = ProductModificator.objects.get(id=prod['mod_id']).price
            except ProductModificator.DoesNotExist:
                mod = ''
            except ValueError:
                mod = ''
            try:
                mod_without_price = ProductModificatorWithoutPrice.objects.get(
                    id=int(prod['mod_id_without_price'])).name
            except ProductModificator.DoesNotExist:
                mod_without_price = ''
            except ValueError:
                mod_without_price = ''

            price = price * prod['quantity']
            total_price += price
            prods_in_cart.append(
                {
                    'prod_id': id,
                    'name': name,
                    'mod': mod,
                    'mod_without_price': mod_without_price,
                    'price': price,
                    'quantity': prod['quantity']
                }
            )
        return JsonResponse({'prods_in_cart': prods_in_cart, 'total_price': total_price})

    def get(self, request):
        return render(request, 'page-cart.html')


class sendToTg(View):
    def post(self, request):
        token = "1641017842:AAHYOTNtQvnVmTYNAYH6jZYMUuVLNCKvnV4"
        chat_id = "-436789562"
        emodji = request.POST.get('emodji')
        order = request.POST.get('order')
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        adress = request.POST.get('adress')
        delivery_time = request.POST.get('delivery-time-sub__number')
        pay_method = request.POST.get('pay-method')
        pay_method_sub = request.POST.get('pay-method-sub')
        add_info = request.POST.get('add-info')
        print(request.POST)
        switch_row_symbol = '\n'
        tab_row_symbol = '\t'
        response_msg = f'{emodji}' \
                       f'{switch_row_symbol}<b>Заказ:</b> {order.replace("|||", switch_row_symbol + tab_row_symbol)}' \
                       f'{switch_row_symbol}<b>Имя:</b> {name}<b>Телефон:</b> {phone}' \
                       f'{switch_row_symbol}<b>Адрес:</b> {adress}' \
                       f'{switch_row_symbol}<b>Время доставки:</b> {delivery_time}' \
                       f'{switch_row_symbol}<b>Оплата:</b> {pay_method}' \
                       f'{switch_row_symbol}<b>Сдача:</b> {pay_method_sub}' \
                       f'{switch_row_symbol}<b>Комментарий:</b> {add_info}'
        request = requests.get(
            f"https://api.telegram.org/bot{token}/sendMessage?chat_id={chat_id}&parse_mode=html&text={response_msg}")
        # todo добавление заказа в БД
        return JsonResponse({'result': 'ok'})


class OrderConfirmView(View):
    def get(self, request):
        return render(request, 'page-thx.html')
