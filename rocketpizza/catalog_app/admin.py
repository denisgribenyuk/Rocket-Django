from django.contrib import admin
from .models import *


# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_visible']
    list_filter = ['is_visible']
    search_fields = ['title']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'is_visible']
    list_filter = ['category', 'is_visible']
    search_fields = ['name']


@admin.register(ProductModificator)
class ProductModificatorAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(SiteData)
class SiteDataAdmin(admin.ModelAdmin):
    pass
