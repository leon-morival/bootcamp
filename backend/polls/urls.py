from ninja import NinjaAPI, Schema, ModelSchema
from typing import List
from polls.models import Game, Player, Question
from polls.services import create_game, get_players, change_score, advance_turn, add_question

api = NinjaAPI()

class AddGameSchema(Schema):
    name: str
    players: List[str]

class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = ["id", "name", "score", "busted", "finished"]

class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = ["id", "name", "turn", "ended"]

@api.post("/create_game", response=GameSchema)
def add_game(request, game_data: AddGameSchema):
    game = create_game(game_data.name, game_data.players)
    return game

@api.get("/game/{game_id}/players", response=List[PlayerSchema])
def get_game_players(request, game_id: int):
    players = get_players(game_id)
    return players

class UpdateScoreSchema(Schema):
    player_id: int
    new_score: int

@api.put("/player/{player_id}/change_score")
def update_player_score(request, data: UpdateScoreSchema):
    success = change_score(data.player_id, data.new_score)
    if not success:
        return {"error": "Player not found"}, 404
    return {"status": "success"}

@api.post("/game/{game_id}/next_turn")
def next_turn(request, game_id: int):
    try:
        game = Game.objects.get(id=game_id)
    except Game.DoesNotExist:
        return {"error": "Game not found"}, 404
    
    result = advance_turn(game)
    return result


