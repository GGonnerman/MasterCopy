from Window import Window
from game.GameBoard import GameBoard

#####
# Create root window
#####

window = Window()

######
# Create Controller
#######

#TODO: chess960 (random backrow)
#TODO: Intro screen - chess type selection
#TODO: Display opening type
#TODO: AI - give input through value at diff locations,
# TODO: end game button?
# TODO: restart button?

game_board = GameBoard(window.get_canvas(), movement_hints=True)
game_board.setup()


def process_click(event):
    row = int(event.y / Window.BOX_LENGTH)
    column = int(event.x / Window.BOX_LENGTH)
    return row, column


def click_event(event):
    row, column = process_click(event)
    game_board.click(row, column)
    print("Row: " + str(row) + " Column: " + str(column))
    print("Clicked on: " + game_board.get_piece(row, column).name)


def escape_event(event):
    game_board.clear_selections()


window.bind_click(click_event)
window.bind_escape(escape_event)

#######
# Event Loop
#######

window.get_root().mainloop()
