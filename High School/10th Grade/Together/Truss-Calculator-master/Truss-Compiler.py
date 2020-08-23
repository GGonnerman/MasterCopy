#!/usr/bin/python3
from Components import *
from math import *
import tkinter as tk
tkinter = tk # Make is easier to reference tkinter

isShifted = False # Indicates if shift is held down
joinSelectionCount = 0

windowSize = 850.0 # Total window size
gridSquareCount = 20.0 # Number of squares displayed
gridSquareSize = windowSize / gridSquareCount # Pixel count per grid square

Joint.setRadius(gridSquareSize / 3)

# Use the distance equation to get the Euclidean distance between two points, given as tuples
def getDistance(locationOne, locationTwo):
    xDistance = (locationOne.x - locationTwo.x) ** 2
    yDistance = (locationOne.y - locationTwo.y) ** 2
    return sqrt(xDistance + yDistance)

# Process primary click
def leftClick(event):
    x, y = event.x, event.y

    # Only create a joint if the shiftkey is not being held down
    if(isShifted == False):
        # Grab the closest grid intersection
        x, y = getNearestGridLocation(x, y)
        for joint in Joint.jointList: 
            if x == joint.location.x and y == joint.location.y: return # Skip if already exists
        # Create the joint with the given location and append position to joint locations
        joint = Joint.fromCoords(x, y)
        joint.draw(canvas)
    else:
        # Check if a joint was clicked on, if so select it
        currentJoint = getClickedJoint(Point(x, y))
        if (currentJoint is not None) and (currentJoint not in Joint.selectedList):
            currentJoint.select(canvas)
            if len(Joint.selectedList) == 2:
                # TODO: Edge case: joint under beam ???
                for beam in Beam.beamList:
                    if (( Joint.selectedList[0] == beam.start and Joint.selectedList[1] == beam.end ) or
                        ( Joint.selectedList[1] == beam.start and Joint.selectedList[0] == beam.end )):
                        clearAllSelections()
                        return
                beam = Beam(Joint.selectedList[0], Joint.selectedList[1])
                beam.draw(canvas)
                carryOnJoint = Joint.selectedList[1]
                clearAllSelections()
                carryOnJoint.select(canvas)


# Returns the joint that was clicked on if it exists
def getClickedJoint(clickLocation):
    print('Joint locations:')
    for joint in Joint.jointList: print(f'\t({joint.location.x}, {joint.location.y})')
    for i, joint in enumerate(Joint.jointList):
        if(Joint.radius > getDistance(clickLocation, joint.location)):
            return joint         

def initializeBeamSelection(joint):
    print(f'Clicked on joint: ({joint.location.x}, {joint.location.y})')
    '''
    add 1 to the amount of slected joints
    if at 2 joints yet
        call make beam
        call cleanup
    else
        call to highlight selected joint
    




    make a cleanup function
        call if shift let go early or press enter with 2 joints
    '''

def shift(event):
    # Invert shift detection when clicked
    global isShifted
    isShifted = True
    print("Shift activated")

def unshift(event):
    global isShifted
    isShifted = False
    print("Shift deactivated")
    clearAllSelections()

def clearAllSelections():
    for joint in Joint.jointList:
        if joint.isSelected:
            joint.unselect(canvas)
    Joint.selectedList = []

def getNearestGridLocation(x, y):
    # Create a square around 
    potentialXPositions = getGridLines(float(x))
    potentialYPositions = getGridLines(float(y))

    # Preset to max possible value
    shortestDistance = float('infinity')

    # Loop through all permuatations of x/y positions
    for potentialX in potentialXPositions: 
        for potentialY in potentialYPositions:
            # Calculate the current distance
            potentialDistance = getDistance(Point(x, y), Point(potentialX, potentialY))
            if potentialDistance < shortestDistance: # Compare against shorter distance
                # Update shorter distances
                shortestDistance = potentialDistance
                shortestPosition = (potentialX, potentialY)
    return shortestPosition

def getGridLines(position):
    position -= (position % gridSquareSize) # Get the lower bound
    return (position, position + gridSquareSize) # Return lower and upper bound

# Initialize the root window
root = tk.Tk()
root.wm_title("Truss Solver")

# Create the canvas and load it onto the root
canvas = tkinter.Canvas(root, width=windowSize, height=windowSize, background='gray')
canvas.grid(row=0, column=1)
canvas.focus_set() # Capture key events on the canvas

# Bind events on the canvas
canvas.bind('<Button-1>', leftClick) # Primary mouse click
canvas.bind('<Shift_L>', shift) # Left shift click
canvas.bind('<KeyRelease-Shift_L>', unshift) # Left shift release

# Draw the gridlines on the canvas
for i in range(int(windowSize) // int(gridSquareSize)):
    canvas.create_line(i*gridSquareSize, 0, i*gridSquareSize, windowSize)
    canvas.create_line(0, i*gridSquareSize, windowSize, i*gridSquareSize)

# Execute the program
root.mainloop() # Nothing below this line gets executed
