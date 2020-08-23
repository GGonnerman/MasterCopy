import tkinter

from game.Color import Color


class TimeWidget():
	turn = Color.WHITE
	root = None

	def __init__(self, root, canvas):
		self.id = tkinter.Text(height=2, width=17)
		self.id.grid(row=0, column=1)
		self.canvas = canvas
		self.white_time = [0, 0, 0]
		self.black_time = [0, 0, 0]
		TimeWidget.root = root
		TimeWidget.running = True
		self.update_white()

	@staticmethod
	def flip_turn():
		TimeWidget.turn = Color.WHITE if TimeWidget.turn == Color.BLACK else Color.BLACK
		TimeWidget.root.configure(background=TimeWidget.turn)

	@staticmethod
	def stop():
		TimeWidget.running = False

	def update_white(self):
		if not TimeWidget.running: return
		self.white_time[2] += 1
		self.white_time[1] = int(self.white_time[2] / 10)
		if self.white_time[1] >= 60:
			self.white_time[2] = 0
			self.white_time[1] = 0
			self.white_time[0] += 1
		self.display()
		if TimeWidget.turn == Color.WHITE:
			self.canvas.after(100, self.update_white)
		else:
			self.canvas.after(100, self.update_black)

	def update_black(self):
		if not TimeWidget.running: return
		self.black_time[2] += 1
		self.black_time[1] = (int)(self.black_time[2] / 10)
		if self.black_time[1] >= 60:
			self.black_time[2] = 0
			self.black_time[1] = 0
			self.black_time[0] += 1
		self.display()
		if TimeWidget.turn == Color.WHITE:
			self.canvas.after(100, self.update_white)
		else:
			self.canvas.after(100, self.update_black)

	def display(self):
		self.id.configure(state='normal')
		self.id.delete("1.0", tkinter.END)
		self.id.insert(tkinter.END, 'Black time: %02d:%02d\nWhite time: %02d:%02d' % (
		self.black_time[0], self.black_time[1], self.white_time[0], self.white_time[1]))
		self.id.configure(state='disabled')
