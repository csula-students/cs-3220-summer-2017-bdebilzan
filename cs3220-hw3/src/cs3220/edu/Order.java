package cs3220.edu;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public class Order{
	public final int id;
	public final int qty;
	public final double total;
	public FoodItem foodItems;
	public final String customerName;
	public enum Statuses
	{
		IN_QUEUE, 
		IN_PROGRESS, 
		COMPLETED;
	};
	public final Statuses status;
	public final Date created;
	

	public Order (int id, FoodItem foodItems, String customerName, Statuses status, Date created,int qty, double total) {
		this.id = id;
		this.foodItems = foodItems;
		this.customerName = customerName;
		this.status = status;
		this.created = created;
		this.qty = qty;
		this.total = total;
	}

	public int getId() {
		return id;
	}

	public FoodItem getItems() {
		return foodItems;
	}

	public String getCustomerName() {
		return customerName;
	}
	
	public Statuses getStatuses() {
		return status;
	}
	
	public Date getCreated()
	{
		return created;
	}
	
	public double getTotal()
	{
		return total;
	}
	
	public int getQty()
	{
		return qty;
	}
}