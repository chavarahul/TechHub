from flask import Flask, request, jsonify
from google.cloud import translate_v2 as translate

app = Flask(__name__)

@app.route('/translate', methods=['POST'])
def translate_text():
    print("ddd")
    data = request.json
    text = data.get('text')
    target_language = data.get('target_language')

    if not text or not target_language:
        return jsonify({'error': 'Text and target_language are required.'}), 400
    client = translate.Client()

    # Translate the text
    try:
        translation = client.translate(text, target_language=target_language)
        translated_text = translation['translatedText']
        return jsonify({'translated_text': translated_text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
