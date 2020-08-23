from Constants import TERRAIN

class Terrain:
    # TODO: Make this into a list of constants to reduce the generation
    # and storage overhead

    # Sets a name and image path based on the given terrain id
    def __init__(self, terrain_id, sub_terrain_id=0):
        self.terrain_id = terrain_id
        self.sub_id = sub_terrain_id
        self.image_path = TERRAIN[self.terrain_id][self.sub_id]
