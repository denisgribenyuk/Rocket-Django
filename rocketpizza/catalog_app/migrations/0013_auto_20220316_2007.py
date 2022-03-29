# Generated by Django 3.2.10 on 2022-03-16 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog_app', '0012_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='sitedata',
            name='not_available_site_text',
            field=models.TextField(blank='', default='', verbose_name='Если сайт выключен, то что выводить?'),
        ),
        migrations.AddField(
            model_name='sitedata',
            name='site_is_work',
            field=models.BooleanField(blank=True, default=True, verbose_name='Сайт включен?'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(null=True, upload_to='prod_images', verbose_name='Изображение продукта'),
        ),
    ]
