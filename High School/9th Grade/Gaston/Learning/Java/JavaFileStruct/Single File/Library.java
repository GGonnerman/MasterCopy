// Library Class

import java.util.HashMap; // Importing hashmap

public class Library { // Our class

	private String name; // Library Name
	private int yearFounded; // Year founded
	private HashMap<String, Book> books; // books contained at library
	/*
	 * BookName -> Book Object
	 */

	Library(String name, int yearFounded) { // When you create the object, what do you pass to it?
		this.name = name; // setting object name to name passed
		this.yearFounded = yearFounded;
		books = new HashMap<String, Book>(); // creating new empty hashmap for books
	}

	public void printInformation() { // print out all information about library
		System.out.println("Name: " + name);
		System.out.println("Year Founded: " + yearFounded);

		for(Book book: books.values()) { // Loop through all book objects in the book hashmap
			book.printInformation(); // call the function printInformation on each book
		}
		System.out.println("");
	}

	public void addBook(String bookName, int ISBN, String author) {
		Book newBook = new Book(bookName, ISBN, author); // Create a new book object
		if(books.containsKey(bookName)) { // if the book is already in the hashmap
			books.get(bookName).increaseValue(); // increase the book count of the book
		} else {
			books.put(bookName, newBook); // add the book object to the hashmap
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

// Book Class

class Book {
	
	private String name;
	private int ISBN;
	private String author;
	private int bookCount;

	Book(String name, int ISBN, String author) {
		this.name = name;
		this.ISBN = ISBN;
		this.author = author;
		bookCount = 1;
	}

	public void printInformation() {
		System.out.println("Name: " + name);
		System.out.println("\tISBN: " + ISBN);
		System.out.println("\tAuthor: " + author);
		System.out.println("\tBook Count: " + bookCount);
	}

	public void increaseValue() {
		bookCount++;
	}

}
