from flask import Flask, render_template, request, redirect, url_for
import json
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

# JSON file to store discussion details
DISCUSSION_JSON_FILE = 'discussion.json'

# Load discussions from JSON file
def read_discussions():
    try:
        with open('discussions.json', 'r') as file:
            discussions = json.load(file)
        return discussions
    except FileNotFoundError:
        return []

# Load users from JSON file
def read_users():
    try:
        with open('users.json', 'r') as file:
            users = json.load(file)
        return users
    except FileNotFoundError:
        return []

# Save discussions to JSON file
def write_discussions(discussions):
    with open('discussions.json', 'w') as file:
        json.dump(discussions, file, indent=4)

# Save users to JSON file
def write_users(users):
    with open('users.json', 'w') as file:
        json.dump(users, file, indent=4)


def load_discussion():
    if os.path.exists(DISCUSSION_JSON_FILE):
        with open(DISCUSSION_JSON_FILE, 'r') as file:
            discussion = json.load(file)
        return discussion
    return []


def save_discussion(discussion):
    with open(DISCUSSION_JSON_FILE, 'w') as file:
        json.dump(discussion, file, indent=2)


@app.route('/')
def index():
    discussion = load_discussion()
    return render_template('discussion.html', discussion=discussion)


# Remove the 'username' parameter from the post_message route
@app.route('/post_message', methods=['POST'])
def post_message():
    username = request.form.get('username')
    message = request.form.get('message')

    if not message:
        return redirect(url_for('index'))

    discussion = load_discussion()
    discussion.append({'username': username, 'message': message})
    save_discussion(discussion)

    return redirect(url_for('index'))


app.run(debug=True)
