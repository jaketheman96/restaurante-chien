require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3502;

app.listen(PORT, () => console.log("'Your Restaurant' running on port", PORT));