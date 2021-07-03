from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View, TemplateView
from .models import Post



def Home(request):
    context = {
        "title": "Home",
    }
    return render(request,'blog/home.html', context)
# Create your views here.
def About(request):
    return render(request, 'blog/about.html', {"title": "About"})

def Blog(request):
    context = {
        "title": "Blog",
        "posts": Post.objects.all(),
    }
    return render(request, 'blog/blog.html', context)