from Constants import CREATURES, GRASS
from Location import *
from Map import Map
import random
class Creatures:

    def __init__(self, location):
        self.location = location
        self.starve_time = 20
        self.eating_cooldown = 0
        self.timeFood = 2
        self.__class__.count += 1

    def move(self, surroundings):
        # If you haven't eaten in long enough, die
        if self.timeFood == self.starve_time:
            self.__class__.count -= 1
            return False

        # Add one in time since eating, and remove 1 from eating cooldown
        self.timeFood += 1
        self.eating_cooldown -= 1

        direction = self.get_direction()
        # Check if a direction exists and can be moved to
        if surroundings[direction] and surroundings[direction].terrain.terrain_id == 0 and len([x for x in surroundings[direction].creature_list if isinstance(x, self.__class__)]) == 0:
            self.location = surroundings[direction].location
        return True

    def eat(self, creatureList):
        # If you can't eat yet, skip
        if self.eating_cooldown > 0: return

        # Grab one down, i.e., (Grass <- Rabbit <- Fox)
        if self.id - 1 == creatureList[0].id:
            self.timeFood = 0
            creatureList[0].__class__.count -= 1
            return creatureList[0]

    def reproduce(self):
        if self.timeFood == 0:
            surroundings = Map.get_surrounding_squares(self.location)
            # Reset eating cooldown
            self.eating_cooldown = 4
            for i in range(2):
                direction = random.randrange(0, 4)
                # Check if direction can be spawned on
                if surroundings[direction] != [] and surroundings[direction].terrain.terrain_id == 0 and len([x for x in surroundings[direction].creature_list if isinstance(x, self.__class__)]) == 0:
                # Wouldn't allow spawning on *anything* (Grass, Rabbit, Fox)
                #if surroundings[direction] != [] and surroundings[direction].terrain.terrain_id == 0 and len([x for x in surroundings[direction].creature_list if isinstance(x, Creatures)]) == 0:
                    return self.__class__(surroundings[direction].location)

    def draw(self, win):
        win.blit(self.IMG, self.location.get_coord_location())


class Rabbit(Creatures):
    count = 0
    def __init__(self, *args):
        Creatures.__init__(self, *args)
        self.IMG = CREATURES[0]
        self.id = 1

    def get_direction(self):
        return random.randrange(0, 4)


class Fox(Creatures):
    count = 0
    def __init__(self, *args):
        Creatures.__init__(self, *args)
        self.IMG = CREATURES[1]
        self.id = 2

    def get_direction(self):
        return random.randrange(0, 4)


class Grass(Creatures):
    count = 0
    def __init__(self, *args):
        Creatures.__init__(self, *args)
        self.IMG = GRASS[random.randrange(0, 2)]
        self.timeFood = 0
        self.id = 0
        self.active = True

    def get_direction(self):
        return random.randrange(0, 4)

    def move(self, surroundings):
        return True

    def reproduce(self):
        if self.active and random.random() > .86: # Higher = easier to survive for a long time
            surroundings = Map.get_surrounding_squares(self.location)
            for square in surroundings:
                # Don't grow onto an existing piece of grass
                if square and len([x for x in square.creature_list if isinstance(x, Grass)]) == 0: break
            else:
                self.active = False
            if self.timeFood == 0:
                for i in range(3):
                    direction = random.randrange(0, 4)
                    choice = surroundings[direction]
                    # Would allow grass to spawn on location with other creatures, doesn't work well
                    # if choice != [] and choice.terrain.terrain_id == 0 and len([x for x in choice.creature_list if isinstance(x, Grass)]) == 0:
                    # Only spawn if square is completely empty
                    if choice != [] and choice.terrain.terrain_id == 0 and len(choice.creature_list) == 0:
                        return Grass(surroundings[direction].location)
