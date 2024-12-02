import { Hono } from 'hono';

const app = new Hono();

// In-memory database (for demonstration purposes)
const tasks = new Map();

const generateId = () => Math.random().toString(36).substring(2, 9);

// Routes
app.get('/',async(c)=>{
  c.json({message:'Hello Learners'})
})

// Create a new task
app.post('/tasks', async (c) => {
  const body = await c.req.json();
  const id = generateId();
  const newTask = { id, ...body, completed: false };
  tasks.set(id, newTask);

  return c.json({ message: 'Task created', task: newTask }, 201);
});

// Read all tasks
app.get('/tasks', (c) => {
  const allTasks = Array.from(tasks.values());
  return c.json(allTasks);
});

// Read a single task by ID
app.get('/tasks/:id', (c) => {
  const id = c.req.param('id');
  const task = tasks.get(id);

  if (!task) {
    return c.json({ message: 'Task not found' }, 404);
  }

  return c.json(task);
});

// Update a task by ID
app.put('/tasks/:id', async (c) => {
  const id = c.req.param('id');
  const task = tasks.get(id);

  if (!task) {
    return c.json({ message: 'Task not found' }, 404);
  }

  const body = await c.req.json();
  const updatedTask = { ...task, ...body };
  tasks.set(id, updatedTask);

  return c.json({ message: 'Task updated', task: updatedTask });
});

// Delete a task by ID
app.delete('/tasks/:id', (c) => {
  const id = c.req.param('id');

  if (!tasks.has(id)) {
    return c.json({ message: 'Task not found' }, 404);
  }

  tasks.delete(id);
  return c.json({ message: 'Task deleted' });
});

// Default route
app.all('*', (c) => c.json({ message: 'Route not found' }, 404));

export default app;
