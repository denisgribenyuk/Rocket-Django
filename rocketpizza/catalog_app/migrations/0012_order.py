# Generated by Django 4.0.2 on 2022-02-23 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog_app', '0011_productmodificatorwithoutprice_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.CharField(max_length=1000, verbose_name='Состав заказа')),
                ('name', models.CharField(max_length=100, verbose_name='Имя')),
                ('phone', models.CharField(max_length=15, verbose_name='Телефон')),
                ('adress', models.CharField(max_length=1000, verbose_name='Адрес')),
                ('delivery_time', models.CharField(max_length=100, verbose_name='Информация о времени доставки')),
                ('pay_method', models.CharField(max_length=20, verbose_name='Метод оплаты')),
                ('pay_method_sub', models.CharField(blank='', max_length=15, null=True, verbose_name='Сдача')),
                ('add_info', models.CharField(blank='', max_length=1000, null=True, verbose_name='Комментарий')),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Заказ',
                'verbose_name_plural': 'Заказы',
            },
        ),
    ]
