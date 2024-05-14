from django.urls import path
from .views import GetWeather,GetSpecificCityWeather

urlpatterns = [
    path('get-weather/', GetWeather.as_view(), name='weather'),
    path('get-specific-city-weather/', GetSpecificCityWeather.as_view(), name='GetSpecificCityWeather'),
    # Add other URL patterns here if any
]
