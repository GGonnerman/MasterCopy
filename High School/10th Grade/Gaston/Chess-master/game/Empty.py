from game.ChessPiece import ChessPiece
from game.Color import Color


class Empty(ChessPiece):

	def __init__(self, column, row, canvas):
		super(Empty, self).__init__("Empty", Color.NONE, 0, 0, canvas)
