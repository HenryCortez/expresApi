class AuthService {
    constructor(database) {
        this.db = database;
    }

    // VULNERABLE login method (intentionally kept for the lab)
    async login(user, password) {
        const sql = `SELECT id, username FROM users WHERE (username='${user}' OR email='${user}') AND password='${password}' LIMIT 1;`;
        console.log('SQL:', sql);
        
        try {
            const user = await this.db.get(sql);
            if (!user) {
                return { ok: false, msg: 'Credenciales inválidas' };
            }
            return { ok: true, user: user.username, id: user.id };
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Error during login');
        }
    }

    // VULNERABLE register method (intentionally kept for the lab)
    async register(username, password, email) {
        const sql = `INSERT INTO users(username, password, email) VALUES('${username}', '${password}', '${email}');`;
        console.log('SQL:', sql);

        try {
            const result = await this.db.run(sql);
            return { 
                ok: true, 
                user: { 
                    id: result.id, 
                    username: username,
                    email: email
                } 
            };
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error('Error during registration');
        }
    }
}

module.exports = AuthService;
