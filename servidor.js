
const http = require("http");
const url = require("url");


let tasks = [
  { id: 1, description: "Tarea 1", completed: false },
  { id: 2, description: "Tarea 2", completed: true },
];

// función para obtener todas las tareas
function getTasks(req, res) {
 
  res.setHeader("Content-Type", "application/json");
 
  res.statusCode = 200;
  
  res.end(JSON.stringify(tasks));
}

 //función para crear una nueva tarea
function createTask(req, res) {
 
  let body = "";
 
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // Cuando todos los datos de la solicitud se han recibido
  req.on("end", () => {
   
    const newTask = JSON.parse(body);
   
    tasks.push(newTask);
    
    res.statusCode = 201;
    res.end(JSON.stringify({ message: "Tarea creada exitosamente" }));
  });
}

//función para obtener una tarea por su ID
function getTaskById(req, res, taskId) {
 
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(task));
  } else {
   
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Tarea no encontrada" }));
  }
}

//función para actualizar una tarea por su ID
function updateTask(req, res, taskId) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    
    const updatedTask = JSON.parse(body);
    
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      
      tasks[taskIndex] = updatedTask;
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Tarea actualizada exitosamente" }));
    } else {
     
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Tarea no encontrada" }));
    }
  });
}

//función para eliminar una tarea por su ID
function deleteTask(req, res, taskId) {

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
   
    tasks.splice(taskIndex, 1);
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Tarea eliminada exitosamente" }));
  } else {
    
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Tarea no encontrada" }));
  }
}

// Crear un servidor HTTP utilizando Node.js
const server = http.createServer((req, res) => {
  // Analizar la URL de la solicitud y obtener la ruta, el método y otros detalles
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // En función de la ruta y el método de la solicitud, llamar a las funciones correspondientes
  if (path === "/tasks" && method === "GET") {
    getTasks(req, res);
  } else if (path === "/tasks" && method === "POST") {
    createTask(req, res);
  } else if (path.startsWith("/tasks/") && method === "GET") {
    const taskId = parseInt(path.substring(7));
    getTaskById(req, res, taskId);
  } else if (path.startsWith("/tasks/") && method === "PUT") {
    const taskId = parseInt(path.substring(7));
    updateTask(req, res, taskId);
  } else if (path.startsWith("/tasks/") && method === "DELETE") {
    const taskId = parseInt(path.substring(7));
    deleteTask(req, res, taskId);
  } else {
    
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Ruta no encontrada" }));
  }
});

// Definir el puerto 
const port = 8000;

// Iniciar el servidor y mostrar un mensaje en la consola
server.listen(port, () => {
  console.log(`Servidor inicializado en el puerto ${port}`);
});
