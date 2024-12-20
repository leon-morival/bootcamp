from django.db import models

# Create your models here.

class Question(models.Model):
  question_text = models.CharField(max_length=200)
  pub_date = models.DateField("date published")

class Choice(models.Model):
  question = models.ForeignKey(Question, on_delete=models.CASCADE)
  choice_text = models.CharField(max_length=200)
  votes = models.IntegerField(default=0)






class Game(models.Model): 
  name = models.CharField(max_length=50)
  turn = models.IntegerField(default=0)
  ended = models.BooleanField(default=False)

class Player(models.Model):
  name=  models.CharField(max_length=50)
  score = models.IntegerField(default=0)
  game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="players")
  finished = models.BooleanField(default=False) 
  busted = models.BooleanField(default=False) 
