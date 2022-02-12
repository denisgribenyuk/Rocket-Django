from django.apps import AppConfig


class CatalogAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'catalog_app'


class FacesetConfig(AppConfig):
    name = 'catalog_app'
    verbose_name = "Каталог продуктов и инфа о сайте"
