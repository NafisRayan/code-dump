## Task 1


import pandas as pd
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import f1_score
import nltk


nltk.download('punkt')      
nltk.download('punkt_tab')  


data = pd.read_csv('IMDB Dataset.csv')


def preprocess_text(text):
    text = text.lower() 
   
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = nltk.word_tokenize(text)  
    return ' '.join(tokens)  


data['review'] = data['review'].apply(preprocess_text)


vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(data['review'])  
y = data['sentiment'] 


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)


model = MultinomialNB()
model.fit(X_train, y_train)


y_pred = model.predict(X_test)


f1 = f1_score(y_test, y_pred, pos_label='positive')
print(f"F1 Score: {f1:.4f}")






## TASK 2


def load_glove(file_path):
    embeddings = {}
    with open(file_path, encoding='utf-8') as f:
        for line in f:
            values = line.split()
            word = values[0]
            vector = np.asarray(values[1:], dtype='float32')
            embeddings[word] = vector
    return embeddings

glove_path = 'glove.6B.100d.txt'
glove = load_glove(glove_path)

def analogy(word_a, word_b, word_c, glove):
    vec = glove[word_a] - glove[word_b] + glove[word_c]
    best_word = None
    max_sim = -1
    for word in glove:
        if word in [word_a, word_b, word_c]: continue
        sim = np.dot(vec, glove[word]) / (np.linalg.norm(vec) * np.linalg.norm(glove[word]))
        if sim > max_sim:
            best_word = word
            max_sim = sim
    return best_word

print("Queen - Female + Male = ", analogy('queen', 'female', 'male', glove))




## TASK 3

import nltk
nltk.download('punkt_tab')

from nltk.corpus import gutenberg
from gensim.models import Word2Vec

sentences = []
for file_id in gutenberg.fileids():
    words = gutenberg.sents(file_id)
    sentences.extend([[w.lower() for w in sent if w.isalpha()] for sent in words])

model = Word2Vec(sentences, vector_size=100, window=5, min_count=5, workers=4)

print("Similarity between 'love' and 'affection':", model.wv.similarity('love', 'affection'))
print("Analogy: king - man + woman =", model.wv.most_similar(positive=['king', 'woman'], negative=['man'])[0])



import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

words = list(model.wv.key_to_index)[:100]
word_vectors = np.array([model.wv[word] for word in words])

pca = PCA(n_components=2)
reduced = pca.fit_transform(word_vectors)

plt.figure(figsize=(12, 8))
plt.scatter(reduced[:, 0], reduced[:, 1])

for i, word in enumerate(words):
    plt.annotate(word, xy=(reduced[i, 0], reduced[i, 1]), fontsize=9)

plt.title("PCA of Top 100 Words in Gutenberg Word2Vec")
plt.show()


