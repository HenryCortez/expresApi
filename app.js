const express = require('express');

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(express.json());
    }

    setupRoutes() {
        // Health check endpoint
        this.app.get('/', (req, res) => {
            res.send('SQLi Lab - /login?user=...&pass=...');
        });

        // Login endpoint
        this.app.post('/login', async (req, res) => {
            try {
                const { user, password } = req.body;
                if (!user || !password) {
                    return res.status(400).json({ error: 'User and password are required' });
                }
                const result = await this.authService.login(user, password);
                if (!result.ok) {
                    return res.status(401).json(result);
                }
                res.json(result);
            } catch (error) {
                console.error('Login error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        // Register endpoint
        this.app.post('/register', async (req, res) => {
            try {
                const { user, password, email } = req.body;
                if (!user || !password || !email) {
                    return res.status(400).json({ error: 'User, password, and email are required' });
                }
                const result = await this.authService.register(user, password, email);
                res.json(result);
            } catch (error) {
                console.error('Registration error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }

    // Set auth service (dependency injection)
    setAuthService(authService) {
        this.authService = authService;
    }

    start() {
        return this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}

module.exports = App;
