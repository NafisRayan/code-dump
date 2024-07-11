#app.py

from flask import Flask, render_template, request, redirect, url_for, session, flash
import pygame as pg

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with an actual secret key

# Load existing user data from the "users.txt" file
users = {}


def load_users():
    #user_id,name,username,country,birthdate,password
    with open('users.txt', 'r') as file:
        for line in file:
            data = line.strip().split(',')
            user_id, name, username, country, birthdate, password = data
            users[int(user_id)] = {
                'name': name,
                'username': username,
                'country': country,
                'birthdate': birthdate,
                'password': password,
            }

load_users()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        for user_id, user_data in users.items():
            if user_data['username'] == username and user_data['password'] == password:
                session['user_id'] = user_id  # Store user ID in session
                flash('Login successful!', 'success')
                return redirect(url_for('profile'))

        flash('Invalid username or password. Please register if you are a new user.', 'danger')
        return redirect(url_for('register'))

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        username = request.form['username']
        country = request.form['country']
        birthdate = request.form['birthdate']
        password = request.form['password']

        for user_data in users.values():
            if user_data['username'] == username:
                flash('Username already exists. Please choose a different username.', 'danger')
                return redirect(url_for('register'))

        # Generate a unique user ID
        user_id = len(users) + 1
        users[user_id] = {
            'name': name,
            'username': username,
            'country': country,
            'birthdate': birthdate,
            'password': password,
        }
        save_users_to_file()  # Save the updated user data to the file
        flash('Registration successful! You can now log in.', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/profile')
def profile():
    user_id = session.get('user_id')
    if user_id:
        user_info = users.get(user_id)
        if user_info:
            return render_template('profile.html', user_info=user_info)
    flash('Please log in to access your profile.', 'danger')
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    # Clear the user_id from the session to log the user out
    session.pop('user_id', None)
    flash('You have been logged out successfully.', 'success')
    return redirect(url_for('home'))

def save_users_to_file():
    with open('users.txt', 'w') as file:
        for user_id, user_data in users.items():
            name = user_data['name']
            username = user_data['username']
            country = user_data['country']
            birthdate = user_data['birthdate']
            password = user_data['password']
            file.write(f"{user_id},{name},{username},{country},{birthdate},{password}\n")

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/tetris_game')
def tetris_game():
    return render_template('tetris_embed.html')

app.run(debug=True)
