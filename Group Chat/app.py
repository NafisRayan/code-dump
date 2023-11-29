from flask import Flask, render_template, request, redirect, url_for, g
import sqlite3
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
app.config['DATABASE'] = os.path.join(app.root_path, 'database.db')

# Check if the users table exists
def check_users_table():
    with app.app_context():
        db = get_db()
        cur = db.cursor()
        cur.execute(''' SELECT count(name) FROM sqlite_master WHERE type='table' AND name='users' ''')
        if cur.fetchone()[0] == 1:
            return True
        return False

# Check if the discussion table exists
def check_discussion_table():
    with app.app_context():
        db = get_db()
        cur = db.cursor()
        cur.execute(''' SELECT count(name) FROM sqlite_master WHERE type='table' AND name='discussion' ''')
        if cur.fetchone()[0] == 1:
            return True
        return False

# Database functions
def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(app.config['DATABASE'])
        g.db.row_factory = sqlite3.Row
    return g.db

# Initialize the database
def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

# Check and create tables if they don't exist
if not check_users_table():
    init_db()

if not check_discussion_table():
    init_db()

# Load discussions from the database
def load_discussion():
    with app.app_context():
        db = get_db()
        cur = db.execute('SELECT username, message FROM discussion ORDER BY id DESC')
        discussion = cur.fetchall()
        return discussion

# Save a new message to the discussion table
def save_discussion(username, message):
    with app.app_context():
        db = get_db()
        db.execute('INSERT INTO discussion (username, message) VALUES (?, ?)', (username, message))
        db.commit()

@app.route('/')
def index():
    discussion = load_discussion()
    return render_template('discussion.html', discussion=discussion)

@app.route('/post_message', methods=['POST'])
def post_message():
    if 'username' not in g:
        return redirect(url_for('index'))

    username = g.username
    message = request.form.get('message')

    if not message:
        return redirect(url_for('index'))

    save_discussion(username, message)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
