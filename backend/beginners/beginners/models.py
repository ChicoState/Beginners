from django.db import models


class User(models.Model):
    username = models.CharField(max_length=24, primary_key = True)
    userpass = models.CharField(max_length=24)
    isTeacher = models.BooleanField()

class Tutorial(models.Model):
    tutorialTitle = models.CharField(max_length=300, primary_key = True)
    tutorialBody = models.CharField(max_length=10000)