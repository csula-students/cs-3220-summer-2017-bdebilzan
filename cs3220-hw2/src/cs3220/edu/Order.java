package cs3220.edu;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public class Order{
	public final int id;
	public List<String> items = Arrays.asList("Ginger Sesame Salmon", "Hasselback Marinara Chicken", "Nacho Steak Skillet");
	public final String customerName;
	public enum Statuses
	{
		IN_QUEUE, 
		IN_PROGRESS, 
		COMPLETED;
	};
	public final Statuses status;
	public final Date created;
	

	public Order (int id, List<String> items, String customerName, Statuses status, Date created) {
		this.id = id;
		this.items = items;
		this.customerName = customerName;
		this.status = status;
		this.created = created;
	}

	public int getId() {
		return id;
	}

	public Collection getItems() {
		return items;
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
}
