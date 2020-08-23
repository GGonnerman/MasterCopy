from game.ChessPiece import ChessPiece
from game.ContinousMovement import ContinousMovement


class Bishop(ChessPiece, ContinousMovement):

	def __init__(self, color, row, column, canvas):
		super(Bishop, self).__init__("Bishop", color, row, column, canvas)

	def get_potential_moves(self, gameboard):
		return self.add_until_end(gameboard, [1, 1], [-1, 1], [-1, -1], [1, -1])
