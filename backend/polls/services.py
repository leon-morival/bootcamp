from polls.models import Game, Player, Question, Choice
from django.core.exceptions import ObjectDoesNotExist
from datetime import date

def create_game(game_name: str, players: list[str]) -> Game:
    """
    Crée un nouveau jeu avec le nom donné et initialise les joueurs.
    """
    game = Game.objects.create(name=game_name)
    for name in players:
        Player.objects.create(name=name, game=game)
    return game

def get_players(game_id: int) -> list:
    """
    Retourne tous les joueurs d'un jeu spécifique.
    """
    try:
        game = Game.objects.get(pk=game_id)
        players = game.players.all()
        return players
    except ObjectDoesNotExist:
        return []

def change_score(player_id: int, new_score: int) -> bool:
    """
    Change le score d'un joueur spécifique.
    """
    try:
        player = Player.objects.get(pk=player_id)
        player.score = new_score
        player.save()
        return True
    except ObjectDoesNotExist:
        return False

def advance_turn(game: Game) -> dict:
    """
    Avance au tour suivant pour le jeu donné. Si le jeu est terminé, renvoie une indication.
    """
    players = game.players.all()
    current_turn = game.turn
    next_turn = (current_turn + 1) % len(players)

    for player in players:
        if player.score > 21:
            player.busted = True
            player.save()

    valid_players = [p for p in players if not p.busted and not p.finished]
    if not valid_players:
        game.ended = True
        game.save()
        return {"gameOver": True}

    game.turn = next_turn
    game.save()
    return {"nextPlayerIndex": next_turn, "gameOver": False}

def add_question(question_text: str, choices: list[str]) -> Question:
    """
    Ajoute une question avec ses choix.
    """
    question = Question.objects.create(question_text=question_text, pub_date=date.today())
    for choice_text in choices:
        Choice.objects.create(question=question, choice_text=choice_text, votes=0)
    return question
