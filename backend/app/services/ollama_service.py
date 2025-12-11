
def qa_with_ollama(context, question, max_tokens=256):
	"""
	Ask a question about the given context using the local Ollama Llama2 model.
	Returns the answer string.
	"""
	prompt = f"You are an expert PDF assistant. Given the following document, answer the user's question as helpfully as possible.\n\nDocument:\n{context}\n\nQuestion: {question}\n\nAnswer:"
	payload = {
		"model": OLLAMA_MODEL,
		"prompt": prompt,
		"options": {"num_predict": max_tokens},
		"stream": False
	}
	response = requests.post(OLLAMA_API_URL, json=payload, timeout=120)
	response.raise_for_status()
	data = response.json()
	return data.get("response", "")
import requests

OLLAMA_API_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama2"

def summarize_with_ollama(text, max_tokens=256):
	"""
	Summarize the given text using the local Ollama Llama2 model.
	Returns the summary string.
	"""
	prompt = f"Summarize the following document in a concise paragraph:\n\n{text}"
	payload = {
		"model": OLLAMA_MODEL,
		"prompt": prompt,
		"options": {"num_predict": max_tokens},
		"stream": False
	}
	response = requests.post(OLLAMA_API_URL, json=payload, timeout=120)
	response.raise_for_status()
	data = response.json()
	return data.get("response", "")
