#https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7/train/python
class Battleship:
    def __init__(self, row, column):
        self.segment = [[row, column]]
        
    def validator(self, row, column):     
        if (self.segment[-1][0] == row - 1 and self.segment[-1][1] == column):
            self.segment.append([row, column])
            self.direction = True
            return True
        elif (self.segment[-1][1] == column - 1 and self.segment[-1][0] == row):
            self.segment.append([row, column])
            self.direction = False
            return True
    
def validate_battlefield(field):
    dict = {
        4: 0, #Battleship
        3: 0, #Cruiser
        2: 0, #Destroyer
        1: 0  #Submarine
    }
    
    ships = []
    deadZone = []
    partner = True
    for indexR, row in enumerate(field):
        for indexC, column in enumerate(field[indexR]):
            if column == 1:
                if len(ships) == 0:
                    ships.append(Battleship(indexR, indexC))
                else:
                    cords = [indexR, indexC]
                    
                    if cords in deadZone:
                        return False
                    
                    corDir = {"up": cords[0] > 0, 
                              "down": cords[0] < 10, 
                              "left": cords[1] > 0, 
                              "right": cords[1] < 10
                     }        
                    
                    if corDir["left"] and corDir["up"]:
                        deadZone.append([cords[0] - 1, cords[1] - 1])
                    if corDir["left"] and corDir["down"]:
                        deadZone.append([cords[0] - 1, cords[1] + 1])
                    if corDir["right"] and corDir["up"]:
                        deadZone.append([cords[0] + 1, cords[1] - 1])
                    if corDir["right"] and corDir["down"]:
                        deadZone.append([cords[0] + 1, cords[1] + 1])
                    partner = True
                    for obj in ships:
                        if obj.validator(indexR, indexC) and partner: 
                            partner = False
                    if partner: 
                        ships.append(Battleship(indexR, indexC))

    for obj in ships:
        if len(obj.segment) in dict: dict[len(obj.segment)] += 1
        else: return False
        
    for i in range(1,5):
        if dict[i] != (5 - i): return False
    return True
