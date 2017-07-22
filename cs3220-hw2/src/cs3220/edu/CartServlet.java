package cs3220.edu;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import cs3220.edu.FoodEntry;
import cs3220.edu.Order.Statuses;

/**
 * Servlet implementation class CartServlet
 */
@WebServlet("/shopping-cart")
public class CartServlet extends HttpServlet {
	public void init() {
		// init the application scope to have pre-set values
		List<FoodEntry> entries = new ArrayList<>();
		entries.add(new FoodEntry(entries.size(), "Ginger Sesame Glazed Salmon", "The salmon is sliced and marinated, then cooked in sesame oil. Served with sauce on the side and chopped fresh cilantro sprinkled on top. Garnished with black sesame seeds.", "<img src= 'https://cdn4.ruled.me/wp-content/uploads/2014/05/SoySearedSalmon.jpg' width = '140' height = '100'>", 20.00));
		entries.add(new FoodEntry(entries.size(), "Hasselback Marinara Chicken", "The chicken breasts are sliced accordion style and stuffed with spinach and cheeses. Topped with tomato sauce and mozzarella.", "<img src= 'https://cdn4.ruled.me/wp-content/uploads/2017/03/IMG_1166.jpg' width = '140' height = '100'>", 18.00));
		entries.add(new FoodEntry(entries.size(), "Nacho Steak Skillet", "This nacho steak skillet features roasted cauliflower, thin sliced steak, cheese, and lots of fun nacho toppings.","<img src= 'https://cdn4.ruled.me/wp-content/uploads/2017/05/featured1.jpg' width = '140' height = '100'>", 16.00));
	getServletContext().setAttribute("entries", entries);
	}

	public void doGet( HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		List<FoodEntry> entries = (List<FoodEntry>) getServletContext().getAttribute("entries");
		// tell browser this is html document
		response.setContentType("text/html");

		out.println("<head>");
		out.println("<style>body { " +
		"}</style>");
		out.println("<img src = 'https://logopond.com/logos/936fb12d35d4bb7f4f9d6c3085caa4e4.png' width= '180' height='180'> The Bistro" );
		out.println("<br><br> <a href = '/cs3220-hw2/menu'> Menu </a>" + "&nbsp;&nbsp;&nbsp;" + "<a href = '/cs3220-hw2/orders'> Orders </a>" + "&nbsp;&nbsp;&nbsp;" + "<a href = '/cs3220-hw2/admin/orders'> Orders - Admin </a>" 
		+ "&nbsp;&nbsp;&nbsp;" + "<a href = '/cs3220-hw2/shopping-cart'> Shopping Cart </a>");
		out.println("<br><br> Cart <br>");
		out.println("</head>");
		out.println("<table>");
		out.println("<tr>" + "<td>" + "Item" + "</td>" + "<td>" + "Price" + "</td>" + "<td>" + "Quantity" + "</td>");
		for (FoodEntry entry: entries) {
			out.println(
				"<tr>" + 
					"<td>" + entry.getName() + "</td>" + 
					"<td>" + entry.getPrice() + "</td>" +
					"<td>" + "1" + "</td>" +
				"</tr>"
			);
		}
		out.println("</table>");
		out.println("<br> &copy; The Bistro Inc., All Rights Reserved");
	}
}
