import java.util.HashMap;

public class Library {

	private String name;
	private int yearFounded;
	private HashMap<String, Book> books;

	Library(String name, int yearFounded) {
		this.name = name;
		this.yearFounded = yearFounded;
		books = new HashMap<String, Book>();
	}

	public void printInformation() {
		System.out.println("Name: " + name);
		System.out.println("Year Founded: " + yearFounded);

		for(Book book: books.values()) {
			book.printInformation();
		}
		System.out.println("");
	}

	public void addBook(String bookName, int ISBN, String author) {
		Book newBook = new Book(bookName, ISBN, author);
		if(books.containsKey(bookName)) {
			books.get(bookName).increaseValue();
		} else {
			books.put(bookName, newBook);
		}
	}


	public static void main(String[] args) {
		System.out.println("Program running...");

		Library wpl = new Library("Waverly Public Library", 2017);

		wpl.printInformation();
		wpl.addBook("In Search of Lost Time", 1011, "Marcel Proust");
		wpl.printInformation();
		wpl.addBook("In Search of Lost Time", 1011, "Marcel Proust");
		wpl.printInformation();
		wpl.addBook("Don Quixote", 4630, "Miguel de Cervantes");
		wpl.printInformation();
	}

}
