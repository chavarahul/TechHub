import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
from io import BytesIO
import cloudinary
import cloudinary.uploader

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

cloudinary.config(
    cloud_name="dxfujspwu",
    api_key="575875917966656",
    api_secret="_MvreXnhQZ_1FyRyL75Fnuyt6u0"
)

device = "cuda" if torch.cuda.is_available() else "cpu"
pipeline = StableDiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-2-1", 
    torch_dtype=torch.float16
).to(device)
pipeline.enable_attention_slicing()

@app.route("/generate-quiz", methods=["POST"])
def generate_quiz_api():
    data = request.json
    prompt = data.get("prompt")
    num_questions = data.get("questions")
    difficulty = data.get("difficulty")
    quiz = generate_quiz(prompt, num_questions, difficulty)
    return jsonify({"status": "success", "questions": quiz})

@app.route('/generate', methods=['POST'])
def generate_image():
    try:
        data = request.json
        if "prompt" not in data:
            return jsonify({"error": "Missing 'prompt' in request body"}), 400
        prompt = data["prompt"]
        with torch.no_grad():
            image = pipeline(prompt).images[0]
        buffer = BytesIO()
        image.save(buffer, format="PNG")
        buffer.seek(0)
        upload_result = cloudinary.uploader.upload(buffer, folder="generated_images")
        image_url = upload_result.get("secure_url")
        return jsonify({"status": "success", "image_url": image_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
