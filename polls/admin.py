from django.contrib import admin
from polls.models import Game, Player, Question, Choice

# Register your models here.
admin.site.register(Game)
admin.site.register(Player)
admin.site.register(Question)
admin.site.register(Choice)