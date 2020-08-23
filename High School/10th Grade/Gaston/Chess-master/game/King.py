from game.ChessPiece import ChessPiece
from game.SetMovement import SetMovement


class King(ChessPiece, SetMovement):

	def __init__(self, color, row, column, canvas):
		super(King, self).__init__("King", color, row, column, canvas)

	def get_potential_moves(self, gameboard):
		return self.check_position(gameboard, [0, 1], [1, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1])
