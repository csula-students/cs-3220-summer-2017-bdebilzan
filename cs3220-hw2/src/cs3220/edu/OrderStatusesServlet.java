
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
import cs3220.edu.FoodEntry;


@WebServlet("/orders")
public class OrderStatusesServlet extends HttpServlet {
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
		out.println("<img src = 'https://logopond.com/logos/936fb12d35d4bb7f4f9d6c3085caa4e4.png' width= '180' height='180'> The Bistro" );
		out.println("<br><br> <a href = '/cs3220-hw2/menu'> Menu </a>" + "&nbsp;&nbsp;&nbsp;" + "<a href = '/cs3220-hw2/orders'> Orders </a>" + "&nbsp;&nbsp;&nbsp;" + "<a href = '/cs3220-hw2/admin/orders'> Orders - Admin </a>" 
		+ "&nbsp;&nbsp;&nbsp;" + "<a href = '/cs3220-hw2/shopping-cart'> Shopping Cart </a>");
		out.println("<br><br> Order Statuses <br>");
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
				"</tr>"
			);
		}
		out.println("</table>");
		out.println("<br> &copy; The Bistro Inc., All Rights Reserved");
	}
}