from game.ChessPiece import ChessPiece
from game.SetMovement import SetMovement


class Knight(ChessPiece, SetMovement):

	def __init__(self, color, row, column, canvas):
		super(Knight, self).__init__("Knight", color, row, column, canvas)

	def get_potential_moves(self, gameboard):
		return self.check_position(gameboard, [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2])
