import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Import routes (placeholder, add actual routes later)
// app.use('/api', routes);

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
