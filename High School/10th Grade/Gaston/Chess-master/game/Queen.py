from game.ChessPiece import ChessPiece
from game.ContinousMovement import ContinousMovement


class Queen(ChessPiece, ContinousMovement):

	def __init__(self, color, row, column, canvas):
		super(Queen, self).__init__("Queen", color, row, column, canvas)

	def get_potential_moves(self, gameboard):
		return self.add_until_end(gameboard, [0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1], [-1, 1])
