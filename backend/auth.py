from huggingface_hub import login

HUGGINGFACE_TOKEN = "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"
login(HUGGINGFACE_TOKEN, add_to_git_credential=True)
print("Login successful")
