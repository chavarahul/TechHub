from flask import Flask, request, jsonify
from flask_cors import CORS

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
