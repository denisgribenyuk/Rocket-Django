# Generated by Django 4.0.2 on 2022-02-13 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog_app', '0010_product_start_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductModificatorWithoutPrice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Имя модификатора')),
            ],
            options={
                'verbose_name': 'Модификатор не влияющий на цену',
                'verbose_name_plural': 'Модификатор не влияющие на цену',
            },
        ),
        migrations.AddField(
            model_name='product',
            name='modificator_no_price',
            field=models.ManyToManyField(blank=True, null=True, to='catalog_app.ProductModificatorWithoutPrice'),
        ),
    ]
