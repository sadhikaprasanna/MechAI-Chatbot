from flask import Flask, jsonify, request
#from langchain_ollama import ChatOllama
from flask_cors import CORS
from langchain_groq import ChatGroq

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
  # Enable CORS so React can communicate with Flask

# Initialize the LLaMA model with Ollama
#llm = ChatOllama(model="llama3.2:3b", temperature=0.35)
llm=ChatGroq(groq_api_key="")

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400
        
        # Use llm.chat to get the response from the LLM using the user message
        response = llm.invoke(user_message)
        

        # Extract the content from the AIMessage object
        ai_response = response.content if hasattr(response, 'content') else str(response)

        return jsonify({"response": ai_response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8100)