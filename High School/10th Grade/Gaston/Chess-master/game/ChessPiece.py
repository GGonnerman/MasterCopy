import copy
import tkinter

from Window import Window
from game.Color import Color


class ChessPiece(object):

	def __init__(self, name, color, row, column, canvas):
		self.name = name
		self.color = color
		self.row = row
		self.column = column

		if color == Color.NONE: return

		file_name = "White_" + name if color == Color.WHITE else "Black_" + name
		self._photo_image = tkinter.PhotoImage(file="media/" + file_name + ".png")
		self.id = canvas.create_image(self.get_coords(), image=self._photo_image)

	def __str__(self):
		return self.name

	def __deepcopy__(self, memodict={}):
		clone = copy.copy(self)
		for name, value in vars(self).items():
			if name not in ['_photo_image']:
				setattr(clone, name, copy.deepcopy(value, memodict))
			else:
				setattr(clone, name, None)
		return clone

	def get_potential_moves(self, gameboard):
		return []

	def get_coords(self):
		box_length = Window.BOX_LENGTH
		return self.column * box_length + (box_length / 2), self.row * box_length + (box_length / 2)

	def move_to_position(self, canvas):
		box_length = Window.BOX_LENGTH
		canvas.coords(self.id, self.column * box_length, self.row * box_length,
					  (self.column + 1) * box_length, (self.row + 1) * box_length)
