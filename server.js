const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at localhost: ${PORT}`);
});

export default app;
