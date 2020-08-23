import tkinter

from game.Color import Color
from TimeWidget import TimeWidget

from game.Bishop import Bishop
from game.Box import Box
from game.Empty import Empty
from game.King import King
from game.Knight import Knight
from game.Pawn import Pawn
from game.Queen import Queen
from game.Rook import Rook

import copy


class GameBoard():

	def __init__(self, canvas, movement_hints=True):
		self.piece_list = [[Box(row, column, canvas, movement_hints) for column in range(8)] for row in range(8)]
		self.canvas = canvas
		self.selected = -1, -1
		self.movement_hints = movement_hints
		self.turn = Color.WHITE
		self.white_pieces = []
		self.black_pieces = []
		self.paused = False
		self.game_over = False

	def __str__(self):
		output = ""
		for row in range(len(self.piece_list)):
			for column in range(len(self.piece_list)):
				output += self.piece_list[row][column].name()
				if column == len(self.piece_list) - 1: break
				output += " "
			output += "\n" if row < len(self.piece_list) - 1 else ""
		return output

	def __deepcopy__(self, memodict={}):
		clone = copy.copy(self)
		for name, value in vars(self).items():
			if name not in ['canvas']:
				setattr(clone, name, copy.deepcopy(value, memodict))
			else:
				setattr(clone, name, None)
		return clone

	def setup(self):
		for column in range(8):
			self.black_pieces.append(self.piece_list[1][column].set_piece(Pawn(Color.BLACK, 1, column, self.canvas)))
			self.white_pieces.append(self.piece_list[6][column].set_piece(Pawn(Color.WHITE, 6, column, self.canvas)))

		for column in [0, 7]:
			self.black_pieces.append(self.piece_list[0][column].set_piece(Rook(Color.BLACK, 0, column, self.canvas)))
			self.white_pieces.append(self.piece_list[7][column].set_piece(Rook(Color.WHITE, 7, column, self.canvas)))

		for column in [2, 5]:
			self.black_pieces.append(self.piece_list[0][column].set_piece(Bishop(Color.BLACK, 0, column, self.canvas)))
			self.white_pieces.append(self.piece_list[7][column].set_piece(Bishop(Color.WHITE, 7, column, self.canvas)))

		for column in [1, 6]:
			self.black_pieces.append(self.piece_list[0][column].set_piece(Knight(Color.BLACK, 0, column, self.canvas)))
			self.white_pieces.append(self.piece_list[7][column].set_piece(Knight(Color.WHITE, 7, column, self.canvas)))

		self.black_pieces.append(self.piece_list[0][3].set_piece(Queen(Color.BLACK, 0, 3, self.canvas)))
		self.white_pieces.append(self.piece_list[7][3].set_piece(Queen(Color.WHITE, 7, 3, self.canvas)))

		self.black_pieces.append(self.piece_list[0][4].set_piece(King(Color.BLACK, 0, 4, self.canvas)))
		self.white_pieces.append(self.piece_list[7][4].set_piece(King(Color.WHITE, 7, 4, self.canvas)))

	def end_game(self, color):
		self.game_over = True
		TimeWidget.flip_turn()
		TimeWidget.stop()
		if color == Color.NONE:
			text = tkinter.Text(height=1, width=9)
		else:
			text = tkinter.Text(height=1, width=11)
		text.grid(row=0, column=0)
		if color == Color.WHITE:
			text.insert(tkinter.END, "Black Wins!")
		elif color == Color.BLACK:
			text.insert(tkinter.END, "White Wins!")
		else:
			text.insert(tkinter.END, "Stalemate")
		text.configure(state='disabled')

	def flip_turn(self):
		self.turn = Color.WHITE if self.turn == Color.BLACK else Color.BLACK
		TimeWidget.flip_turn()

	def is_in_check(self, color, row=-1, column=-1):
		if color == Color.WHITE:
			piece_list = self.white_pieces
		else:
			piece_list = self.black_pieces

		if row == -1 or column == -1:
			king_position = [piece_list[-1].row, piece_list[-1].column]
		else:
			king_position = [row, column]

		in_check = False
		for row in range(len(self.piece_list)):
			for column in range(len(self.piece_list[0])):
				piece = self.get_piece(row, column)
				if isinstance(piece, Empty): continue
				if piece.color != color and king_position in piece.get_potential_moves(self):
					in_check = True
		return in_check

	def is_in_checkmate(self, color):
		return self.is_in_check(self.turn) and not self.has_any_moves(self.turn)

	def has_any_moves(self, color):
		if color == Color.WHITE:
			piece_list = self.white_pieces
		else:
			piece_list = self.black_pieces

		for row in range(len(self.piece_list)):
			for column in range(len(self.piece_list[0])):
				piece = self.get_piece(row, column)
				if isinstance(piece, Empty) or piece.color != color: continue
				for move in piece.get_potential_moves(self):
					if not self.test_move(piece, row, column, move[0], move[1]):
						return True
		return False

	# Tests to see if a move would put the mover into check
	def test_move(self, game_piece, old_row, old_column, new_row, new_column):
		fake_board = copy.deepcopy(self)
		game_piece = copy.deepcopy(game_piece)
		fake_board.piece_list[new_row][new_column].set_piece(game_piece)
		fake_board.piece_list[old_row][old_column].delete_piece()
		game_piece.row = new_row
		game_piece.column = new_column
		if isinstance(game_piece, King) and game_piece.color == fake_board.turn:
			return fake_board.is_in_check(fake_board.turn, new_row, new_column)
		else:
			return fake_board.is_in_check(fake_board.turn)

	def clear_selections(self):
		for row in range(len(self.piece_list)):
			for column in range(len(self.piece_list[0])):
				if self.piece_list[row][column].selected or self.piece_list[row][column].highlighted:
					self.deselect_piece(row, column)

	def click(self, row, column):
		if self.game_over or self.paused: return

		if self.piece_list[row][column].highlighted:
			if self.test_move(self.get_piece(*self.selected), self.selected[0], self.selected[1], row, column): return
			self.move_piece(self.get_piece(*self.selected), self.selected[0], self.selected[1], row, column)
			self.clear_selections()
			piece = self.get_piece(row, column)
			if isinstance(piece, Pawn) and ((self.turn == Color.WHITE and piece.row == 0) or (self.turn == Color.BLACK and piece.row == 7)):
				if self.turn == Color.WHITE:
					piece_list = self.white_pieces
				else:
					if piece.row != 7: return
					piece_list = self.black_pieces
				piece_list.remove(piece)
				self.paused = True
				self.piece_list[row][column].set_piece(piece.promote(self.turn, row, column, self.canvas))
				self.paused = False
				piece_list.insert(0, self.get_piece(row, column))
			self.flip_turn()
			if self.is_in_checkmate(self.turn):
				self.end_game(self.turn)
			elif not self.has_any_moves(self.turn):
				self.end_game(Color.NONE)

		if self.get_piece(row, column).color == self.turn:
			self.clear_selections()
			self.select_piece(row, column)

	def select_piece(self, row, column):
		self.selected = row, column
		self.canvas.itemconfig(self.piece_list[row][column].id, self.piece_list[row][column].select())
		potential_moves = self.get_piece(row, column).get_potential_moves(self)
		for row, column in potential_moves:
			self.canvas.itemconfig(self.piece_list[row][column].id, self.piece_list[row][column].highlight())

	def deselect_piece(self, row, column):
		self.canvas.itemconfig(self.piece_list[row][column].id, self.piece_list[row][column].clear_coloring())

	def move_piece(self, game_piece, old_row, old_column, new_row, new_column):
		# Delete old reference to item, since it has been overridden
		# If not here, images won't be deleted... very difficult to debug
		if self.get_piece(new_row, new_column) in self.white_pieces:
			self.white_pieces.remove(self.get_piece(new_row, new_column))
		if self.get_piece(new_row, new_column) in self.black_pieces:
			self.black_pieces.remove(self.get_piece(new_row, new_column))

		self.piece_list[new_row][new_column].set_piece(game_piece)
		self.piece_list[old_row][old_column].delete_piece()
		game_piece.row = new_row
		game_piece.column = new_column
		self.canvas.coords(game_piece.id, game_piece.get_coords())

	def has_piece(self, row, column):
		return 0 <= row < len(self.piece_list) and 0 <= column < len(self.piece_list[0])

	def get_piece(self, row, column):
		column = int(column)
		row = int(row)
		if not self.has_piece(row, column): return
		return self.piece_list[row][column].get_piece()
