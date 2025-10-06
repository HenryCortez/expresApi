const Database = require('./database');
const AuthService = require('./authService');
const App = require('./app');

// Initialize database
const database = new Database('./lab.db');

// Initialize services
const authService = new AuthService(database);

// Initialize and configure the app
const app = new App();
app.setAuthService(authService);

// Start the server
app.start();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
