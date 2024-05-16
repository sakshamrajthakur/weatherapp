from django.http import JsonResponse
from rest_framework.views import APIView
import requests
from rest_framework_simplejwt.authentication import JWTAuthentication

class GetWeather(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        user = request.user
        apiKey = "b03a640e5ef6980o4da35b006t5f2942"
        url = f"https://api.shecodes.io/weather/v1/current?query=delhi&key={apiKey}"
        response = requests.get(url)
        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({'error': 'Failed to fetch weather data'}, status=500)


class GetSpecificCityWeather(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        city = request.data.get('inputValue')
        

        apiKey = "b03a640e5ef6980o4da35b006t5f2942"
        url = f"https://api.shecodes.io/weather/v1/current?query={city}&key={apiKey}"
        
        response = requests.get(url)
        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({'error': 'Failed to fetch weather data'}, status=500)


