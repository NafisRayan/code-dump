from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/searching', methods=['GET', 'POST'])
def searching():
    if request.method == 'POST':
        # Handle the search logic when the form is submitted
        query = request.form['query']
        sorting_option = request.form.get('sort', 'default')

        # Perform search and sorting logic here (you can mock data for now)
        results = ['Result 1', 'Result 2', 'Result 3']

        if sorting_option == 'alphabetical':
            results.sort()  # Sort alphabetically
        # Add more sorting options as needed

        return render_template('searching.html', query=query, results=results)

    # If it's a GET request, just render the empty search page
    return render_template('searching.html')

@app.route('/sorting')
def sorting():
    query = request.args.get('query', '')
    return render_template('sorting.html', query=query)

if __name__ == '__main__':
    app.run(debug=True)
