# Generated by Django 4.0 on 2021-12-15 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog_app', '0004_remove_sitedata_self_address_build_number_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='description',
            field=models.TextField(default='', max_length=500, verbose_name='Описание товара'),
        ),
    ]
