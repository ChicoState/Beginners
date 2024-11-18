from django.contrib import admin
from .models import User, Tutorial

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'userpass', 'isTeacher')

class TutorialAdmin(admin.ModelAdmin):
    list_display = ('tutorialTitle', 'tutorialBody')

admin.site.register(User, UserAdmin)
admin.site.register(Tutorial, TutorialAdmin)