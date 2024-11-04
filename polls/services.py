from polls.models import Game, Player
def create_game(game_name: str, player_names: list[str]):
    game = Game.objects.create(name=game_name)
    
    # Crée les instances de Player associées à cette partie
    for name in player_names:
        Player.objects.create(name=name, game=game)

        
def get_player(game_id):
    pass

def change_score(player_id):
    pass