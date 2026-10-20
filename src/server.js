import express from 'express';
import swaggerUi from 'swagger-ui-express';
import category from './routes/category.js';
import openapi from './openapi.js';
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));
app.use('/categories', category);
app.use((err, req, res, next) => {   // bắt lỗi chung (vd: trùng name -> mã 23505)
  res.status(err.code === '23505' ? 409 : 500).json({ error: err.message });
});
app.listen(3000, () => console.log('http://localhost:3000'));
