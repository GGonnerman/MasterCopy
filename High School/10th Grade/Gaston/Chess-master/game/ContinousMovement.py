from game.Empty import Empty


class ContinousMovement():

	def add_until_end(self, gameboard, *changes):
		potential_moves = []
		for change in changes:
			row = self.row
			column = self.column
			while (True):
				row += change[0]
				column += change[1]
				if isinstance(gameboard.get_piece(row, column), Empty):
					potential_moves.append([row, column])
				else:
					if gameboard.has_piece(row, column) and gameboard.get_piece(row, column).color != self.color:
						potential_moves.append([row, column])
					break
		return potential_moves
