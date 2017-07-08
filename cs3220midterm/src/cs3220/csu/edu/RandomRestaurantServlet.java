package cs3220.csu.edu;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/suggest/restaurants/random")
public class RandomRestaurantServlet extends HttpServlet {
	//private static final long serialVersionUID = 1L;
	
	public void init() {
		// init the application scope to have pre-set values
		List<Restaurant> entries = new ArrayList<>();
			for(int i = 0; i < 23; i++)
			{
				if(i < 10)
				{
					entries.add(new Restaurant(entries.size(), "Student " + i + "'s restaurant" , "http://cs3.calstatela.edu:8080/cs3220xstu0" + i + "/menu", new ArrayList<Integer>(i), new ArrayList<Integer>(i)));
				}
				else if (i > 9)
				{
					entries.add(new Restaurant(entries.size(), "Student " + i + "'s restaurant" , "http://cs3.calstatela.edu:8080/cs3220xstu" + i + "/menu", new ArrayList<Integer>(i), new ArrayList<Integer>(i)));
				}
				
			}
		getServletContext().setAttribute("entries", entries);
	}
       

	public void doGet( HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			PrintWriter out = response.getWriter();
			List<Restaurant> entries = (List<Restaurant>) getServletContext().getAttribute("entries");
			// tell browser this is html document
			response.setContentType("text/html");

			out.println("<head>");
			out.println("<style>body { " +
			"}</style>");
			out.println("</head>");

			out.println("<h1> What's for lunch? </h1>");
			out.println("<table>");
			for (Restaurant entry: entries) {
				out.println(
					"<tr>" + 
						"<td>" + entry.getName() + "  </td>" + 
						"<td>" + entry.getURL() + "</td>" +
						"<td>" + entry.getDesignRatings() + "  </td>" + 
						"<td>" + entry.getTasteRatings() + "</td>" +
						//"<td><a href='admin/foods/edit?id=" + entry.getId() + "'>Feeling Lucky</a> <a href='admin/foods/delete?id=" + entry.getId() + "'>See the list</a></td>" +
					"</tr>"
				);
			}
			out.println("</table>");
			out.println("<a href='suggest/restaurants/random'>Feeling Lucky</a> <a href='suggest/restaurants/random/list'>See the list</a>");
		}


}
