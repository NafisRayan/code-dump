# Function to scrape data
def scrape_data(url):
    # Send HTTP request and parse content
    response = requests.get(url)
    # print(response)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Scraping logic - use BeautifulSoup to find and extract various types of content
    texts = [element.text for element in soup.find_all(['p', 'a', 'img'])]
    links = [element.get('href') for element in soup.find_all('a') if element.get('href')]
    images = [element.get('src') for element in soup.find_all('img') if element.get('src')]

    # Ensure all lists are of the same length by padding the shorter ones with None
    max_length = max(len(texts), len(links), len(images))
    texts += [None] * (max_length - len(texts))
    links += [None] * (max_length - len(links))
    images += [None] * (max_length - len(images))

    # Create a DataFrame using pandas for texts, links, and images
    data = {'Text': texts, 'Links': links, 'Images': images}
    df = pd.DataFrame(data)

    # return the processed data
    return df