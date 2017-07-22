package cs3220.edu;

import java.io.IOException;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/RestaurantAdminServlet")
public class RestaurantAdminServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<FoodItem> items = (List<FoodItem>) request.getSession().getAttribute("items");
		if (items == null) {
			items = new ArrayList<>();
			items.add(new FoodItem(items.size(), "Ginger Sesame Glazed Salmon", 
					"The salmon is sliced and marinated, then cooked in sesame oil. Served with sauce on the side and chopped "
					+ "fresh cilantro sprinkled on top. Garnished with black sesame seeds.", 
					"https://cdn4.ruled.me/wp-content/uploads/2014/05/SoySearedSalmon.jpg", 20.00));
			items.add(new FoodItem(items.size(), "Hasselback Marinara Chicken", "The chicken breasts are sliced accordion style "
					+ "and stuffed with spinach and cheeses. Topped with tomato sauce and mozzarella.",
					"https://cdn4.ruled.me/wp-content/uploads/2017/03/IMG_1166.jpg", 18.00));
			items.add(new FoodItem(items.size(), "Nacho Steak Skillet", "This nacho steak skillet features roasted cauliflower, "
					+ "thin sliced steak, cheese, and lots of fun nacho toppings.",
					"https://cdn4.ruled.me/wp-content/uploads/2017/05/featured1.jpg", 16.00));
		}
		String deletedRecipeName=request.getParameter("Submit");
		if(deletedRecipeName!=null)
		{
			for (Iterator<FoodItem> iter =items.listIterator(); iter.hasNext(); ) {
			    FoodItem item = iter.next();
			    if (item.getName().equals(deletedRecipeName)) {
			        iter.remove();
			    }
			}
		}
		
		request.getSession(true).setAttribute("items", items);
		request.getSession().setAttribute("date", new Date());
		request.getRequestDispatcher("WEB-INF/admininventory.jsp").forward(request, response);

	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.sendRedirect(request.getContextPath() + "/AdminCreateFoodServlet");

	}

	
}