#!/usr/bin/python3 

import random

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Joint:
    color = 'red'
    selectedColor = 'orange'

    jointList = []
    selectedList = []

    def setRadius(radius):
        Joint.radius = radius

    def __init__(self, location):
        self.id = None
        self.location = location
        self.isSelected = False
        Joint.jointList.append(self)
        
    def fromCoords(x, y):
        return Joint(Point(x, y))

    def draw(self, canvas):
        radius = Joint.radius
        self.id = canvas.create_oval(self.location.x - radius, self.location.y - radius, self.location.x + radius, self.location.y+radius, tag=self.id, fill=Joint.color)
        canvas.tag_raise(self.id)

    def select(self, canvas):
        self.isSelected = True
        canvas.itemconfig(self.id, fill=Joint.selectedColor)
        Joint.selectedList.append(self)
        print(f'Selection... ({self.location.x}, {self.location.y})')
        
    def unselect(self, canvas):
        self.isSelected = False
        canvas.itemconfig(self.id, fill=Joint.color)
        if self in Joint.selectedList:
            del Joint.selectedList[Joint.selectedList.index(self)]

    def delete(self, canvas):
        del Joint.jointList[Joint.jointList.index(self)]
        canvas.delete(self.id)

class Beam:
    color = 'black'
    width = 10
    beamList = []

    def __init__(self, start, end):
        self.id = None
        self.start = start
        self.end = end
        self.force = None
        Beam.beamList.append(self)
        print("created new joint")

    def draw(self, canvas):
        # Implement later

        # Blue = inward
        # Red = outward
        # Compression
        start = self.start.location
        end = self.end.location
        self.id = canvas.create_line(start.x, start.y, end.x, end.y, tag=self.id, fill=Beam.color, width=Beam.width)
        for joint in Joint.jointList:
            canvas.tag_raise(joint.id)

    def select(self, canvas):
        canvas.itemconfig(self.id, fill=Beam.selectedColor)

    def unselect(self, canvas):
        canvas.itemconfig(self.id, fill=Beam.color)

    def delete(self, canvas):
        del Beam.beamList[Beam.beamList.index(self)]
        canvas.delete(self.id)
