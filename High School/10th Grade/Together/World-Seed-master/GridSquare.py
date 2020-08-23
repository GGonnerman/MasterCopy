from Location import Location
from Terrain import Terrain
import pygame
import os

# An object representing each cell on the map
# holding a creature and a terrain
class GridSquare:

    altered = []

    def __init__(self, location, terrain_id=0, sub_terrain_id=0):
        self.terrain = Terrain(terrain_id, sub_terrain_id)
        self.location = location
        self.creature_list = []
        # Update self when first displayed
        GridSquare.altered.append(self)

    def draw(self, win):
        # Draw own texture, then all creatures (Grass -> Rabbit -> Fox)
        win.blit(self.terrain.image_path,
                 self.location.get_coord_location())
        for creature in self.creature_list:
            creature.draw(win)

    # Return the name of the terrain currently in the square
    def __str__(self):
        return f"{self.__repr__()} : {len(self.creature_list)}"

    # Reset list of altered squares, and return it
    @staticmethod
    def reset_altered():
        altered = GridSquare.altered[:]
        GridSquare.altered = []
        return altered

    # Add a square to list of altered sqaures
    def set_altered(func):
        def inner(self, *args, **kwargs):
            if self not in GridSquare.altered:
                GridSquare.altered.append(self)
            return func(self, *args, **kwargs)
        return inner

    # Add a creature to the square and sort by id (0 -> 1 -> 2)
    @set_altered
    def add_creature(self, creature):
        self.creature_list.append(creature)
        self.creature_list.sort(key=lambda x: x.id)

    # Remove a creature from the list of creatures currently on the square and
    # return true or false indicating if it was successful or not
    @set_altered
    def delete_creature(self, creature):
        if creature not in self.creature_list:
            return False
        self.creature_list.remove(creature)
        return True

    # Sets the terrain of the square to a new type using the terrainid and subterrain id
    def set_terrain(self, terrain_id, sub_terrain_id=0):
        if self.terrain.terrain_id == terrain_id and self.terrain.sub_id == sub_terrain_id:
            return
        self.terrain = Terrain(terrain_id, sub_terrain_id)
