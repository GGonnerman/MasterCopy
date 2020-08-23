class Location:

    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.location = (x, y)

    # Returns a tuple containing the coord locations
    def get_coord_location(self):
        return (self.x * 16, self.y * 16)

    # Print x/y nicely
    def __str__(self):
        return f"({self.x}, {self.y})"

    # Add self and another location or tuple/list w/ 2 items
    # return a new location object
    def __add__(self, other):
        if isinstance(other, Location):
            return Location(self.x + other.x, self.y + other.y)
        else:
            if len(other) != 2: raise Exception('Error adding to Location')
            return Location(self.x + other[0], self.y + other[1])

    # Subtract self and another location or tuple/list w/ 2 items
    # return a new location object
    def __sub__(self, other):
        if isinstance(other, Location):
            return Location(self.x - other.x, self.y - other.y)
        else:
            if len(other) != 2: raise Exception('Error adding to Location')
            return Location(self.x - other[0], self.y - other[1])
