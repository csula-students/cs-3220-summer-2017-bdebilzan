package cs3220.edu;

public class FoodEntry{
	public final int id;
	public final String name;
	public final String description;
	public final String imageURL;
	public final double price;

	public FoodEntry (int id, String name, String description, String imageURL, double price) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.imageURL = imageURL;
		this.price = price;

	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}
	
	public String getImageURL() {
		return imageURL;
	}
	
	public double getPrice()
	{
		return price;
	}
}