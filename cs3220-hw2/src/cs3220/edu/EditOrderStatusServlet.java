package cs3220.edu;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cs3220.edu.Order.Statuses;
import cs3220.edu.FoodEntry;

/**
 * Servlet implementation class EditOrderStatusServlet
 */
@WebServlet("/admin/order")
	public class EditOrderStatusServlet extends HttpServlet {
	public void doGet( HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		int id = Integer.parseInt(request.getParameter("id"));
		List<Order> entries = (List<Order>) getServletContext().getAttribute("entries");
		Order leEntry = null;
		for (Order entry: entries) {
			if (entry.getId() == id) {
				leEntry = entry;
			}
		}

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("<h1>Editing Order</h1>");
		out.println("<form method=\"post\">");
		out.println("Food Name: <br> <input name='items' type='text' value='" + leEntry.getItems() + "'/></br>");
		out.println("Customer Name: <br> <textarea name='customerName'>" + leEntry.getCustomerName() + "</textarea></br>");
		out.println("Status: <br> <textarea name='status'>" + leEntry.getStatuses() + "</textarea></br>");
		out.println("<button>Done Editing</button>");
		out.println("</form>");
	}

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int id = Integer.parseInt(request.getParameter("id"));
		List<Order> entries = (List<Order>) getServletContext().getAttribute("entries");
		Order leEntry = null;
		int index = -1;
		for (int i = 0; i < entries.size(); i ++) {
			if (entries.get(i).getId() == id) {
				leEntry = entries.get(i);
				index = i;
			}
		}
		entries.set(index, new Order(
			leEntry.getId(),
			null,
			request.getParameter("customerName"),
			//request.getParameter("status"),
			Statuses.IN_QUEUE,
			new java.util.Date(System.currentTimeMillis())));
		getServletContext().setAttribute("entries", entries);

		PrintWriter out = response.getWriter();
		out.println("<a href='../../cs3220-hw2/orders'>go back to orders (customer view)</a>");
	}
}
