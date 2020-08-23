import java.io.IOException;
import java.util.ArrayList;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class WebScraper{
	public static void main(String[] args) {
		Document document;
		try {
			document = Jsoup.connect("http://books.toscrape.com/catalogue/category/books/science-fiction_16/index.html").get();
			Elements price = document.select(".price_color:contains(£)");
			Elements bookTitle = document.select(".product_pod").select("a[title]");
			Elements book = document.select(".product_pod").select("p[class]");
			ArrayList<String> bookRating = new ArrayList<String>();
			for (int i = 0; i < book.size(); i++) {
				if(book.get(i).attr("class").contains("star-rating")) {
					bookRating.add(book.get(i).attr("class").substring(12));
				}
			}
			for(int j = 0; j < price.size() && j < bookTitle.size(); j++) {
				print("The book " + bookTitle.get(j).attr("title") + " costs " + price.get(j).text() + " with a rating of " + bookRating.get(j) + " stars");
			}
		}
		catch (IOException e){
			e.printStackTrace();
		}
	}
	public static void print(String string) {
		System.out.println(string);
	}
}