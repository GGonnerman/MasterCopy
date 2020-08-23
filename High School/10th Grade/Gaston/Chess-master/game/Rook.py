from game.ChessPiece import ChessPiece
from game.ContinousMovement import ContinousMovement


class Rook(ChessPiece, ContinousMovement):

	def __init__(self, color, row, column, canvas):
		super(Rook, self).__init__("Rook", color, row, column, canvas)

	def get_potential_moves(self, gameboard):
		return self.add_until_end(gameboard, [0, 1], [0, -1], [1, 0], [-1, 0])
