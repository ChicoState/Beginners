# views.py in backend/search/views.py

from django.shortcuts import render

def homepage(request):
    # Render the homepage template
    return render(request, 'index.html')  # Ensure you have the template set up
