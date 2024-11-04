from typing import Optional
from ninja import NinjaAPI, ModelSchema, Schema
from polls.models import Game, Player
from datetime import date
from polls.services import create_game
# from polls.services import add_question
api = NinjaAPI()

# Game
class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = ["id", "name", "turn", "ended"]
        
class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = ["id", "name", "score"]

class AddGame(Schema):
    name: str
    players: list[str]

class UpdateGame(Schema):
    name: Optional[str]
    question_text: Optional[str]
    choices: Optional[list[str]]

@api.post("/create_game", response=GameSchema)
def add_game(request, game: AddGame):
    return create_game(game_name=game, players=list[str])
