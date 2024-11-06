from ninja import NinjaAPI, ModelSchema, Schema
from polls.models import Game, Player
from typing import List
from polls.services import create_game
api = NinjaAPI()

class GameSchema(ModelSchema):
     class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "turn",
            "ended",
     
        ]



class PlayerSchema(ModelSchema):
     class Meta:
        model = Player
        fields = [
            "id",
            "name",
            "score",
        ]
     
class AddGame(Schema):
     name: str
     players: List[str]
     
class UpdateGame(Schema):
     name: str
     players: List[str]

class PlayerUpdateSchema(Schema):
    id: int
    score: int

@api.post("/create_game", response=GameSchema)
def add(request, game: AddGame):
    new_game = create_game(game.name, game.players)
    return new_game

@api.get("/game/{id}", response=GameSchema)
def get(request, game_id: int):
    current_game = Game.objects.get(pk=game_id)
    return current_game

@api.delete("/delete_game/{id}")
def delete(request, game_id:int):
     delete_game = Game.objects.get(pk=game_id)
     delete_game.delete()
     return delete_game

@api.put("/update_game", response=GameSchema)
def update(request, game_id: int, data: UpdateGame):
    game = Game.objects.get(pk=game_id)
    game.name = data.name
    game.save()
    return game

@api.get("/game/{game_id}/players", response=list[PlayerSchema])
def get_players(request, game_id: int):
    players = Player.objects.filter(game_id=game_id)  # Filtrer les joueurs par game_id
    return players

@api.put("/game/{game_id}/update_scores", response=list[PlayerSchema])
def update_scores(request, game_id: int, data: List[PlayerUpdateSchema]):

    game = Game.objects.get(id=game_id)
    updated_players = []
    for player_data in data:
        player = Player.objects.get(id=player_data.id, game=game)
        player.score = player_data.score
        player.save()
        updated_players.append(player)

    return updated_players

@api.post("/game/{game_id}/next_turn")
def next_turn(request, game_id: int):

    game = Game.objects.get(id=game_id)
    players = game.players.all()

    current_turn = game.turn
    next_turn = (current_turn + 1) % len(players) 
    for i in range(len(players)):
        player = players[next_turn]
        if not player.busted and not player.finished:
            game.turn = next_turn
            game.save()
            return {"nextPlayerIndex": next_turn, "gameOver": False}
        next_turn = (next_turn + 1) % len(players)

    game.ended = True
    game.save()
    return {"gameOver": True}

 
