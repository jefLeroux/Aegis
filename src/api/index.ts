import express from 'express';
import hashRoutes from './routes/hashRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app routes
app.use('/api', hashRoutes);
app.get('/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
