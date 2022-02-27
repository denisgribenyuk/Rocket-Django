# -*- coding: utf-8 -*-

import os, sys

sys.path.insert(0, '/home/r/raketams/pizza-django/public_html/rocketpizza')
sys.path.insert(1, '/home/r/raketams/pizza-django/public_html/venv/lib/python3.8/site-packages')
os.environ['DJANGO_SETTINGS_MODULE'] = 'rocketpizza.settings'
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()