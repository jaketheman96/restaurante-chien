import 'dotenv/config'
import App from './App';

const PORT = process.env.PORT || 3001;

new App().startServer(PORT);