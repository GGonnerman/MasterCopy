from Map import Map
from Location import Location
from Constants import WIDTH, HEIGHT, SQUARECOUNT, GRASS, ASSETS
from Creatures import *

import pygame
pygame.font.init()
import time
import os
import random
import math

win = pygame.display.set_mode((WIDTH, HEIGHT), pygame.DOUBLEBUF, 32)
clock = pygame.time.Clock()
STAT_FONT = pygame.font.SysFont("comicscans", 30)

gamerules = {
    "#Grass": 100,
    "#Rabbit": 160,
    "#Fox": 80,

    "#Water": 0,
    "#Valley": 0,

    "MaxGrass": 2000,
    "GrassDistance": 3
}


def spawnCreatures():
    max_iterations = 1000000
    while gamerules["#Grass"] > 0:
        # Safeguard if not enough squares to spawn
        max_iterations -= 1
        if max_iterations <= 0: break
        # Grab random locations
        gLocation = Location(random.randrange(SQUARECOUNT),
                             random.randrange(SQUARECOUNT))
        rLocation = Location(random.randrange(SQUARECOUNT),
                             random.randrange(SQUARECOUNT))
        fLocation = Location(random.randrange(SQUARECOUNT),
                             random.randrange(SQUARECOUNT))

        # If need more, try to spawn in random square
        if gamerules["#Grass"] != 0:
            gridSquare = Map.get_location(gLocation)
            terrain = gridSquare.terrain
            if terrain.terrain_id == 0 and terrain.sub_id == 0 and len(gridSquare.creature_list) == 0:
                Map.update(Grass(gLocation))
                gamerules["#Grass"] -= 1

        if gamerules["#Rabbit"] != 0:
            gridSquare = Map.get_location(rLocation)
            if gridSquare.terrain.terrain_id == 0 and len(gridSquare.creature_list) == 0:
                Map.update(Rabbit(rLocation))
                gamerules["#Rabbit"] -= 1

        if gamerules["#Fox"] != 0:
            gridSquare = Map.get_location(fLocation)
            if gridSquare.terrain.terrain_id == 0 and len(gridSquare.creature_list) == 0:
                Map.update(Fox(fLocation))
                gamerules["#Fox"] -= 1


def main():
    run = True

    # Generate structs on map and draw it
    Map.create()
    Map.draw(win)

    # Spawn creatures onto the map
    spawnCreatures()

    while run:

        clock.tick(30)
        for event in pygame.event.get():
            # Exit on quit
            if event.type == pygame.QUIT:
                run == False
                pygame.quit()
                quit()
            # Exit on escape
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    run == False
                    pygame.quit()
                    quit()
        # Iterate creatures
        Map.iterate(win)
        # Create text for scores
        win.blit(ASSETS[0], (WIDTH - 242, 5))
        rabbit_score = STAT_FONT.render(f"Rabbit Score: {Rabbit.count}", 1, (255, 255, 255))
        win.blit(rabbit_score, (WIDTH - 30 - rabbit_score.get_width(), 15))
        fox_score = STAT_FONT.render(f"Fox Score: {Fox.count}", 1, (255, 255, 255))
        win.blit(fox_score, (WIDTH - 30 - fox_score.get_width(), 35))
        grass_score = STAT_FONT.render(f"Grass Score: {Grass.count}", 1, (255, 255, 255))
        win.blit(grass_score, (WIDTH - 30 - grass_score.get_width(), 55))
        # Update the window
        pygame.display.update()

main()
