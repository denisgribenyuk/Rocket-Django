from django.db import models
from datetime import time


class ProductModificator(models.Model):
    name = models.CharField(max_length=100, verbose_name='Имя модификатора')
    price = models.IntegerField(blank=True, null=True, verbose_name='Цена')

    def __str__(self):
        return f'{self.name}. Цена {self.price}'

    class Meta:
        verbose_name = 'Модификатор'
        verbose_name_plural = 'Модификаторы'


class ProductModificatorWithoutPrice(models.Model):
    name = models.CharField(max_length=100, verbose_name='Имя модификатора')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Модификатор не влияющий на цену'
        verbose_name_plural = 'Модификатор не влияющие на цену'


class Category(models.Model):
    title = models.CharField(max_length=70, verbose_name='Имя категории товаров')
    is_visible = models.BooleanField(default=True, verbose_name='Видимость категории')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Product(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название продукта')
    price = models.IntegerField(blank=True, null=True, verbose_name='Цена, если у продукта нет никаких модификаторов')
    start_price = models.IntegerField(blank=True, null=True, verbose_name='Стартовая цена продукта')
    description = models.TextField(blank=True, default='', null=True, max_length=500, verbose_name='Описание товара')
    category = models.ForeignKey('Category', default=None, null=True, on_delete=models.CASCADE, verbose_name='Категория')
    image = models.ImageField(upload_to='static/prod_images', null=True, verbose_name='Изображение продукта')
    is_visible = models.BooleanField(default=True, null=True, verbose_name='Видимость продукта')
    modificator = models.ManyToManyField(ProductModificator, blank=True, null=True)
    modificator_no_price = models.ManyToManyField(ProductModificatorWithoutPrice, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'


class SiteData(models.Model):
    site_name = models.CharField(default='', max_length=100, verbose_name='Имя сайта')
    site_name_browser = models.CharField(default='', max_length=100, verbose_name='Имя сайта для поисковиков')
    main_title = models.TextField(default='', max_length=300, verbose_name='Слоган')
    text_about_delivery = models.TextField(default='', max_length=1000, verbose_name='Текст о стоимости доставки')
    work_start_time = models.TimeField(default=time(11, 00), verbose_name='Начало работы доставки')
    end_start_time = models.TimeField(default=time(22, 00), verbose_name='Конец работы доставки')
    self_address = models.CharField(default='', max_length=150, verbose_name='Адрес местоположения')
    contact_phone_viewed = models.CharField(default='', max_length=10, verbose_name='Номер телефона доставки, видимый')
    contact_phone_full = models.CharField(default='', max_length=10, verbose_name='Номер телефона доставки, полный')

    def __str__(self):
        return f'Данные сайта. Изменять их.'

    class Meta:
        verbose_name = 'Информация на сайте'
        verbose_name_plural = 'Информация на сайте'
