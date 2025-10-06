class AuthService {
    constructor(database) {
        this.db = database;
    }

    // VULNERABLE login method (intentionally kept for the lab)
    async login(username, password) {
        const sql = `SELECT id, username FROM users WHERE (username=? OR email=?) AND password=? LIMIT 1;`;
        console.log('SQL:', sql);
        
        try {
            const user = await this.db.get(sql, [username, username, password]);
            if (!user) {
                return { ok: false, message: 'Credenciales inválidas', data: null };
            }
            return { ok: true, message: 'Login exitoso', data: { id: user.id, user: user.username, email: user.email  } };
        } catch (error) {
            console.error('Login error:', error);
            return { ok: false, message: 'Error durante el login', data: null };
        }
    }

    // VULNERABLE register method (intentionally kept for the lab)
    async register(username, password, email) {
        const sql = `INSERT INTO users(username, password, email) VALUES(?, ?, ?);`;
        console.log('SQL:', sql);

        try {
            const result = await this.db.run(sql, [username, password, email]);
            return { 
                ok: true, 
                message: 'Usuario registrado exitosamente', 
                data: { 
                    id: result.id, 
                    username: username,
                    email: email
                } 
            };
        } catch (error) {
            console.error('Registration error:', error);
            return { ok: false, message: 'Error durante el registro', data: null };
        }
    }
}

module.exports = AuthService;
