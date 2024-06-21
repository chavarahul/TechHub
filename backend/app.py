from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import pandas as pd
import pickle
import re,os


app = Flask(__name__)
CORS(app)

@app.route('/mock',methods=['POST'])
def test():
    try:
        data = request.get_json()
        test_type = data.get('type')
        questions = data.get('questions')
        level = data.get('level')
        prompt = data.get('prompt')

        if not test_type and not questions and not level:
            return jsonify({'error':'data missing'}),400
        
        response = {
            'type':test_type,
            'questions':questions,
            'level':level,
            'prompt':prompt,
            'recieved':True
        }

        return jsonify(response)
    except Exception as e:
        return jsonify({'Internal Error'}),500
    
@app.route('/competitive',methods=['POST'])
def Real():
    try:
        data = request.get_json()
        test_type = data.get('type')
        questions = data.get('questions')
        level = data.get('level')
        prompt = data.get('prompt')

        if not test_type and not questions and not level:
            return jsonify({'error':'data missing'}),400
        
        response = {
            'type':test_type,
            'questions':questions,
            'level':level,
            'prompt':prompt,
            'recieved':True
        }

        return jsonify(response)
    except Exception as e:
        return jsonify('Internal Error'),500
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, 'chatroomtd.csv')
MODEL_PATH = os.path.join(BASE_DIR, 'random_forest_model.pkl')
VECTORIZER_PATH = os.path.join(BASE_DIR, 'tfidf_vectorizer.pkl')

# Load the dataset
data = pd.read_csv(CSV_PATH)
data['text'] = data['text'].str.lower().str.replace('[^a-z\s]', '', regex=True)

# Vectorize the text data
vectorizer = TfidfVectorizer(max_features=1000)
X = vectorizer.fit_transform(data['text']).toarray()
y = data['label']

# Train-test split
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=150, random_state=42)
model.fit(X_train, y_train)

# Save the model and vectorizer
with open(MODEL_PATH, 'wb') as model_file:
    pickle.dump(model, model_file)
with open(VECTORIZER_PATH, 'wb') as vectorizer_file:
    pickle.dump(vectorizer, vectorizer_file)

# Load the model and vectorizer
with open(MODEL_PATH, 'rb') as model_file:
    model = pickle.load(model_file)
with open(VECTORIZER_PATH, 'rb') as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

# Define a function for prediction
def predict_emotion(text):
    text = re.sub('[^a-z\s]', '', text.lower())
    text_vector = vectorizer.transform([text]).toarray()
    prediction = model.predict(text_vector)
    return prediction[0]

# Flask route for prediction
@app.route('/api/chatroom', methods=['POST'])
def fun1():
    data = request.get_json()
    test1 = data.get('msg')
    
    if not test1:
        return jsonify({"error": "No text provided"}), 400

    # Predict emotion using test1
    predicted_emotion = predict_emotion(test1)
    response = {"text": test1, "predicted_emotion": predicted_emotion}
    return jsonify(response)


@app.route('/professional',methods=['POST'])
def proff():
    try:
        data = request.get_json()
        test_type = data.get('type')
        questions = data.get('questions')
        security = data.get('monitering')
        prompt = data.get('prompt')

        if not test_type and not questions and not security:
            return jsonify({'error':'data missing'}),400
        
        if(security):
            sec = 1
        else:
            sec=0
        
        response = {
            'type':test_type,
            'questions':questions,
            'security':sec,
            'prompt':prompt,
            'recieved':True
        }

        return jsonify(response)
    except Exception as e:
        return jsonify('Internal Error'),500


if __name__ == '__main__':
    app.run(debug=True)
