package cs3220.edu;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs3220.edu.Order.Statuses;

@WebServlet("/FoodItem")
public class FoodItem extends HttpServlet {
	public void init() {
		// init the application scope to have pre-set values
		List<Order> entries = new ArrayList<>();
		entries.add(new Order(entries.size(), null, "Bryce", Statuses.IN_QUEUE, new java.util.Date(System.currentTimeMillis())));
		entries.add(new Order(entries.size(), null, "Bryce", Statuses.IN_QUEUE, new java.util.Date(System.currentTimeMillis())));
		entries.add(new Order(entries.size(), null, "Bryce", Statuses.IN_QUEUE, new java.util.Date(System.currentTimeMillis())));
		getServletContext().setAttribute("entries", entries);
	}

	public void doGet( HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		List<Order> entries = (List<Order>) getServletContext().getAttribute("entries");
		// tell browser this is html document
		response.setContentType("text/html");

		out.println("<head>");
		out.println("<style>body { " +
		"}</style>");
		out.println("Order Statuses");
		out.println("</head>");
		out.println("<table>");
		out.println("<tr>" + "<td>" + "Created" + "</td>" + "<td>" + "Item" + "</td>" + "<td>" + "Customer" + "</td>" + "<td>" + "Status" + "</td>");
		for (Order entry: entries) {
			out.println(
				"<tr>" + 
					"<td>" + entry.getCreated() + "</td>" + 
					"<td>" + entry.getItems() + "</td>" + 
					"<td>" + entry.getCustomerName() + "</td>" + 
					"<td>" + entry.getStatuses() + "</td>" +
					"<td><a href='/admin/foods/edit" + entry.getId() + "'>Edit</a> <a href='/admin/foods/delete" + entry.getId() + "'>Delete</a></td>" +
				"</tr>"
			);
		}
		out.println("</table>");
		out.println("<a href='/admin/foods/create'>Add food item</a>");
	}
}