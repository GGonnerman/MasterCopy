import tkinter

from TimeWidget import TimeWidget


class Window():
	SIDE_LENGTH = 400
	BOX_LENGTH = SIDE_LENGTH / 8

	def __init__(self):
		self.root = tkinter.Tk();
		self.root.resizable(0, 0)
		self.canvas = tkinter.Canvas(self.root, width=Window.SIDE_LENGTH, height=Window.SIDE_LENGTH,
									 background='#AAAAAA')
		self.canvas.grid(row=0, column=0)
		self.timer = TimeWidget(self.root, self.canvas)

	def get_root(self):
		return self.root

	def get_canvas(self):
		return self.canvas

	def bind_click(self, click_event):
		self.canvas.focus_set()
		self.canvas.bind("<Button-1>", click_event)

	def bind_escape(self, escape_event):
		self.canvas.focus_set()
		self.canvas.bind('<Escape>', escape_event)
