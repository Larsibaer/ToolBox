package org.todo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.todo.model.todo.Todo;
import org.todo.model.todo.TodoNotFoundException;
import org.todo.model.user.User;
import org.todo.util.ObjectMapperFactory;

import java.io.IOException;
import java.util.List;

@WebServlet("/api/todos/*")
public class TodoListServlet extends HttpServlet {

	private static final ObjectMapper objectMapper = ObjectMapperFactory.createObjectMapper();

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User user = (User) request.getAttribute("user");
		String pathInfo = request.getPathInfo();
		if (pathInfo == null) {
			String category = request.getParameter("category");
			List<Todo> todos = category != null ? user.getTodoList().getTodos(category) : user.getTodoList().getTodos();
			response.setStatus(HttpServletResponse.SC_OK);
			response.setContentType("application/json");
			objectMapper.writeValue(response.getOutputStream(), todos);
		} else {
			try {
				int id = Integer.parseInt(pathInfo.substring(1));
				Todo todo = user.getTodoList().findTodo(id);
				response.setStatus(HttpServletResponse.SC_OK);
				response.setContentType("application/json");
				objectMapper.writeValue(response.getOutputStream(), todo);
			} catch (NumberFormatException ex) {
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			} catch (TodoNotFoundException ex) {
				response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			}
		}
	}

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		try {
			Todo todo = objectMapper.readValue(request.getInputStream(), Todo.class);
			if (todo.getId() != null || todo.getTitle() == null || todo.getTitle().isEmpty()) {
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return;
			}
			User user = (User) request.getAttribute("user");
			user.getTodoList().addTodo(todo);
			response.setStatus(HttpServletResponse.SC_CREATED);
			response.setHeader("Location", request.getRequestURL() + "/" + todo.getId());
			response.setContentType("application/json");
			objectMapper.writeValue(response.getOutputStream(), todo);
		} catch (JsonProcessingException ex) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	@Override
	public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
		try {
			String pathInfo = request.getPathInfo();
			if (pathInfo == null || pathInfo.equals("/")) {
				response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
				return;
			}
			int id = Integer.parseInt(pathInfo.substring(1));

			Todo todo = objectMapper.readValue(request.getInputStream(), Todo.class);
			if (todo.getId() != id || todo.getTitle() == null || todo.getTitle().isEmpty()) {
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return;
			}
			User user = (User) request.getAttribute("user");
			user.getTodoList().updateTodo(todo);
			response.setStatus(HttpServletResponse.SC_OK);
			response.setContentType("application/json");
			objectMapper.writeValue(response.getOutputStream(), todo);
		} catch (JsonProcessingException ex) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		} catch (NumberFormatException | TodoNotFoundException ex) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
	}

	@Override
	public void doDelete(HttpServletRequest request, HttpServletResponse response) {
		try {
			String pathInfo = request.getPathInfo();
			if (pathInfo == null || pathInfo.equals("/")) {
				response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
				return;
			}
			int id = Integer.parseInt(pathInfo.substring(1));
			User user = (User) request.getAttribute("user");
			user.getTodoList().removeTodo(id);
			response.setStatus(HttpServletResponse.SC_NO_CONTENT);
		} catch (NumberFormatException | TodoNotFoundException ex) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
	}

	@Override
	public void doOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setHeader("Allow", "GET, POST, PUT, DELETE, OPTIONS");
		response.setStatus(HttpServletResponse.SC_OK);
	}
}
