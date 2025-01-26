from bottle import Bottle, request, response, run, route
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace

llm = HuggingFaceEndpoint(
    repo_id="microsoft/Phi-3-mini-4k-instruct",
    task="text-generation",
    max_new_tokens=512,
    do_sample=False,
    repetition_penalty=1.03,
)
chat_model = ChatHuggingFace(llm=llm, verbose=True)

print("LLM huggingface model loaded", flush=True)

@route('/chat', method=['OPTIONS', 'POST'])
def chat():

    if request.method == 'OPTIONS':
        return {}

    if request.method == 'POST':
        try:
            data = request.json
            user_message = data.get("message", "")
            print("User message python: ", user_message, flush=True)

            if not user_message:
                # response.content_type = 'application/json'
                return {"response": "No message provided."}, 400

            # response.content_type = 'application/json'
            hf_response = chat_model.invoke(input=user_message)
        except Exception as e:
            return {"response": "An error occurred.", "error": str(e)}, 500
