import os
import pygame
import random

GRIDSIZE = 16
SQUARECOUNT = 50

WIDTH = GRIDSIZE * SQUARECOUNT
HEIGHT = WIDTH


def load(file_name):
    return pygame.image.load(os.path.join("Assets", file_name))


TERRAIN = [
    [load("LightDirt.png"), load("DarkDirt.png")],
    [load("DarkWater.png"), load("LightWater.png")],
    [load("Valley.png")]

]
CREATURES = [
    load("Rabbit.png"),
    load("Fox.png")
]

GRASS = [
    load("LightGrass.png"),
    load("DarkGrass.png")
]
ASSETS = [
    load("text-background.png")
]
