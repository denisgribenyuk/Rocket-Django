# Generated by Django 4.0 on 2021-12-15 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog_app', '0008_alter_productmodificator_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productmodificator',
            name='product',
        ),
        migrations.AddField(
            model_name='product',
            name='modificator',
            field=models.ManyToManyField(blank=True, null=True, to='catalog_app.ProductModificator'),
        ),
    ]
