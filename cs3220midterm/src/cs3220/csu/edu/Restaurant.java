package cs3220.csu.edu;

import java.util.ArrayList;

public class Restaurant{
	public final int id;
	public final String name;
	public final String URL;
	public final ArrayList<Integer> designRatings;
	public final ArrayList<Integer> tasteRatings;

	public Restaurant (int id, String name, String URL, ArrayList<Integer> designRatings, ArrayList<Integer> tasteRatings) {
		this.id = id;
		this.name = name;
		this.URL = URL;
		this.designRatings = designRatings;
		this.tasteRatings = tasteRatings;

	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getURL() {
		return URL;
	}
	
	public ArrayList<Integer> getDesignRatings() {
		return designRatings;
	}
	
	public ArrayList<Integer> getTasteRatings()
	{
		return tasteRatings;
	}
}