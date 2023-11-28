import csv
from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Lists to store user and admin information
users = []
admins = []

# Function to load users and admins from CSV files
def load_users_from_csv(filename, target_list):
    with open(filename, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            target_list.append({'username': row['username'], 'password': row['password']})

# Function to save users to CSV file
def save_users_to_csv(filename, target_list):
    with open(filename, mode='w', newline='') as file:
        fieldnames = ['username', 'password']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        for user in target_list:
            writer.writerow({'username': user['username'], 'password': user['password']})

# Load users and admins from CSV files
load_users_from_csv('users.csv', users)
load_users_from_csv('admins.csv', admins)

# Function to load dorm data from dorms.txt
def load_dorms_from_txt():
    with open('dorms.txt', 'r') as file:
        dorms_data = eval(file.read())
    return dorms_data

# Load dorm data
dorms_data = load_dorms_from_txt()

login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(username):
    for user in users:
        if user['username'] == username:
            return UserMixin()

# Routes

@app.route('/')
def home():
    return render_template('home.html', dorms=dorms_data)

@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        # Handle search parameters and filter dorms
        destination = request.form.get('destination')
        check_in = request.form.get('check-in')
        check_out = request.form.get('check-out')
        guests = request.form.get('guests')

        # Implement the search logic here

        return render_template('search_results.html', dorms=dorms_data)

    return render_template('search.html')

@app.route('/dorm/<int:dorm_id>')
def dorm_details(dorm_id):
    dorm = next((d for d in dorms_data if d['id'] == dorm_id), None)
    if dorm:
        return render_template('dorm_page.html', dorm=dorm)
    else:
        flash('Dorm not found.', 'danger')
        return redirect(url_for('search'))

@app.route('/booking/<int:dorm_id>', methods=['GET', 'POST'])
@login_required
def booking(dorm_id):
    dorm = next((d for d in dorms_data if d['id'] == dorm_id), None)
    if dorm:
        if request.method == 'POST':
            # Handle the booking process
            # Implement booking logic here
            flash('Booking successful!', 'success')
            return redirect(url_for('profile'))

        return render_template('booking.html', dorm=dorm)
    else:
        flash('Dorm not found.', 'danger')
        return redirect(url_for('search'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = next((u for u in users if u['username'] == username), None)

        if user and check_password_hash(user['password'], password):
            login_user(UserMixin())
            flash('Logged in successfully.', 'success')
            return redirect(url_for('profile'))
        else:
            flash('Login failed. Please check your credentials.', 'danger')

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if not any(u['username'] == username for u in users):
            hashed_password = generate_password_hash(password)
            users.append({'username': username, 'password': hashed_password})
            save_users_to_csv('users.csv', users)
            flash('Registration successful. You can now log in.', 'success')
            return redirect(url_for('login'))
        else:
            flash('Registration failed. Username already exists.', 'danger')

    return render_template('register.html')

@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html')

@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        admin = next((a for a in admins if a['username'] == username), None)

        if admin and check_password_hash(admin['password'], password):
            login_user(UserMixin())
            flash('Admin logged in successfully.', 'success')
            return redirect(url_for('admin_panel'))
        else:
            flash('Admin login failed. Please check your credentials.', 'danger')

    return render_template('admin_login.html')

@app.route('/admin_panel')
@login_required
def admin_panel():
    return render_template('admin_panel.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
