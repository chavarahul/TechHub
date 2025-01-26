import google.generativeai as genai
from flask import Flask, request, jsonify,send_file
from flask_cors import CORS
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

genai.configure(api_key="AIzaSyBjsFVUlaaffEHcH7UG_fY-b2RQkYFl_GI") 
model = genai.GenerativeModel("gemini-1.5-flash")  

def generate_quiz(prompt, num_questions, difficulty):
    difficulty_prompt = (
        f"Generate {num_questions} multiple-choice questions on '{prompt}' at {difficulty} difficulty. "
        "Each question should have 4 options labeled A, B, C, D, and the correct answer should be clearly stated. "
        "The format should be: Question: [Question text], A: [Option 1], B: [Option 2], C: [Option 3], D: [Option 4], Correct Answer: [A/B/C/D]."
    )

    response = model.generate_content(difficulty_prompt)

    generated_text = response.text
    questions_data = []

    lines = generated_text.split("\n")
    
    current_question = {}
    for line in lines:
        if line.startswith("Question:"):
            if current_question:
                questions_data.append(current_question)
            current_question = {"question": line[len("Question:"):].strip(), "options": {}, "correct_answer": ""}
        elif line.startswith("A:"):
            current_question["options"]["A"] = line[len("A:"):].strip()
        elif line.startswith("B:"):
            current_question["options"]["B"] = line[len("B:"):].strip()
        elif line.startswith("C:"):
            current_question["options"]["C"] = line[len("C:"):].strip()
        elif line.startswith("D:"):
            current_question["options"]["D"] = line[len("D:"):].strip()
        elif line.startswith("Correct Answer:"):
            current_question["correct_answer"] = line[len("Correct Answer:"):].strip()

    if current_question:
        questions_data.append(current_question)

    return questions_data

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")
pipeline = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4")
pipeline = pipeline.to(device)

# Directory to save generated images
output_dir = "generated_images"
os.makedirs(output_dir, exist_ok=True)

@app.route("/generate-quiz", methods=["POST"])
def generate_quiz_api():
    data = request.json
    prompt = data.get("prompt", "python programming basics")
    num_questions = data.get("questions", 3)
    difficulty = data.get("difficulty", "medium")

    quiz = generate_quiz(prompt, num_questions, difficulty)

    return jsonify({"status": "success", "questions": quiz})

@app.route('/generate', methods=['POST'])
def generate_image():
    try:
        # Parse JSON input
        data = request.json
        if "prompt" not in data:
            return jsonify({"error": "Missing 'prompt' in request body"}), 400
        
        prompt = data["prompt"]
        print(f"Generating image for prompt: {prompt}")

        # Generate the image
        with torch.no_grad():
            image = pipeline(prompt).images[0]

        # Save image to a file
        image_path = os.path.join(output_dir, "generated_image.png")
        image.save(image_path)

        # Return the image file as a response
        return send_file(image_path, mimetype="image/png")
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500
if __name__ == "__main__":
    app.run(debug=True)
