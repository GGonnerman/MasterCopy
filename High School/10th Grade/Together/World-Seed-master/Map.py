from GridSquare import GridSquare
from Terrain import Terrain
from Location import Location
from Constants import WIDTH, HEIGHT, GRIDSIZE, SQUARECOUNT
import math
import random
import pygame
import os

class Map:

    spawnable = set()

    # 2d array of corresponding to width/height of window
    map = [[GridSquare(Location(x, y)) for x in range(SQUARECOUNT)]
           for y in range(SQUARECOUNT)]

    @staticmethod
    def iterate(window):
        Map.move()
        Map.eat()
        Map.reproduce()
        Map.draw(window)

    @staticmethod
    def move():
        # Reset altered squares and loop through
        for gridSquare in GridSquare.reset_altered():
            #creature_list = gridSquare.creature_list
            #for creature in creature_list:
            for creature in gridSquare.creature_list:
                # Don't move if grass and not an active square
                if type(creature).__name__ == 'Grass' and not creature.active: continue
                location = creature.location
                # Delete from current location, move and update to new location
                # unless it returns false (then creature dies)
                gridSquare.delete_creature(creature)
                if creature.move(Map.get_surrounding_squares(location)):
                    Map.update(creature)

    @staticmethod
    def eat():
        for gridSquare in GridSquare.altered:
            #creature_list = gridSquare.creature_list[:]
            #for creature in creature_list:
            for creature in gridSquare.creature_list:
                # Get the creature that was eaten
                eaten_creature = creature.eat(gridSquare.creature_list)
                if eaten_creature:
                    gridSquare.delete_creature(eaten_creature)
                    # If grass was eaten, update surrounding to be active because
                    # they now have a potential spawning square
                    if type(creature).__name__ == 'Grass':
                        for gs in Map.get_surrounding_squares(gridSquare.location):
                            for c in gs.creature_list:
                                if type(creature).__name__ == 'Grass':
                                    creature.active = True

    @staticmethod
    def reproduce():
        for gridSquare in GridSquare.altered[:]:
            for creature in gridSquare.creature_list:
                # Dont attempt to reproduce if inactive grass
                if type(creature).__name__ == 'Grass' and not creature.active: continue
                location = creature.location
                # Get reproduction result and add to map
                if (result := creature.reproduce()):
                    Map.update(result)

    @staticmethod
    def draw(window):
        # Draw all altered squares
        for gridSquare in GridSquare.altered:
            gridSquare.draw(window)

    # Add creature(s) to the map square
    # corresponding to their location 
    @staticmethod
    def update(creature_container):
        if not isinstance(creature_container, (list, tuple)):
            creature_container = [creature_container]
        for creature in creature_container:
            Map.get_location(creature.location).add_creature(creature)

    # Return a list of the grid squares surrounding a location
    # with empty lists when off the map
    @staticmethod
    def get_surrounding_squares(location):
        x, y = location.location
        output = [[], [], [], []]
        if x > 0:
            output[0] = Map.map[y][x - 1]
        if x < SQUARECOUNT - 1:
            output[1] = Map.map[y][x + 1]
        if y > 0:
            output[2] = Map.map[y - 1][x]
        if y < SQUARECOUNT - 1:
            output[3] = Map.map[y + 1][x]
        return output

    # Get the gridsquare at a location or tuple/list
    @staticmethod
    def get_location(location):
        if isinstance(location, Location):
            x, y = location.location
        else:
            x = location[0]
            y = location[1]
        if x < 0 or x >= SQUARECOUNT or y < 0 or y >= SQUARECOUNT:
            raise IndexError(
                f"Tried to get a square out of bounds: ({x}, {y})")
        return Map.map[y][x]

    # Pretty print map
    def __str__(self):
        output = ""
        for row in self.map:
            output += " ".join([gridSquare.terrain
                                for gridSquare in row])
            output += "\n"
        return output

    # Generate a structure with set attributes
    @staticmethod
    def generate_struct(number_of_structs, terrain_id, min_count, max_count, threshold, count=0):
        for i in range(number_of_structs):
            initial_location = (random.randrange(
                0, SQUARECOUNT - 1), random.randrange(0, SQUARECOUNT - 1))
            Map.grow_struct(initial_location, terrain_id,
                            min_count, max_count, threshold)

    # Recursively grow a structure
    @staticmethod
    def grow_struct(initial_location, terrain_id, min_count, max_count, threshold, count=0):
        count += 1
        surrounding_squares = []
        # Check a radius around the current square
        directions = [0]
        for i in range(3): # The range to search
            directions += [-i, i]

        for i in directions:
            for j in directions:
                x = initial_location[0] + i
                y = initial_location[1] + j
                # If off the map, dont add
                if x < 0 or x >= SQUARECOUNT or y < 0 or y >= SQUARECOUNT:
                    continue
                square = Map.map[y][x]
                terrain = square.terrain.terrain_id

                if terrain == terrain_id: # If about to touch other of same terrain, dont add
                    continue
                if terrain_id == 1: # If touching direct, add
                    Map.spawnable.add(square)
                if terrain != 0:
                    return False

                if abs(i) < 3 and abs(j) < 3:
                    # Add everything within a 2x2 area
                    surrounding_squares.append((square, (x, y)))

        # For each square within a 2x2 area
        for square, location in surrounding_squares:
            # Randomly skip, if about min count, or skip if above max count
            if (random.random() < threshold and count > min_count) or count > max_count or square.terrain.terrain_id == terrain_id:
                continue
            if terrain_id == 1 and count <= min_count:
                square.set_terrain(terrain_id, 1)
            else:
                square.set_terrain(terrain_id)

            if square in Map.spawnable:
                Map.spawnable.remove(square)
            # Recursively grow for each block, and return false if it ends early
            if Map.grow_struct(location, terrain_id, min_count, max_count, threshold, count) == False:
                return False
        return True

    # Generates valleys onto the map
    @staticmethod
    def generate_valleys(valley_count=2):
        Map.generate_struct(valley_count, 2, 2, 4, 0.8)

    # Generates lakes onto the map
    @staticmethod
    def generate_lakes(lake_count=4):
        Map.generate_struct(lake_count, 1, 4, 8, 0.9)

    # Generate every component of the map
    @staticmethod
    def create():
        Map.generate_lakes()
        Map.generate_valleys()

        # Make mud around lakes
        for sq in Map.spawnable:
            sq.terrain = Terrain(0, 1)
