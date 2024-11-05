from polls.models import Game, Player, Question, Choice
from datetime import date
def create_game(game_name: str, players: list[str]):
    game = Game.objects.create(name=game_name)
    for name in players:
        Player.objects.create(name=name, game=game)
    game.save()
    return game
        
def get_player(game_id):
    game = Game.objects.get(pk=game_id)
    players = game.players.all()
    return players

def change_score(player_id, new_score):
    player = Player.objects.get(pk=player_id)
    player.score = new_score
    player.save()

# def add_question(request):
#     new_question = Question.objects.create(question_text=AddQuestion.question_text, pub_date=date.today())
#     for choice_text in AddQuestion.choices:
#         Choice.objects.create(question=new_question, choice_text=choice_text, votes=0)

#     return new_question

