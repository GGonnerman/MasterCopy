public class Book {
	
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
