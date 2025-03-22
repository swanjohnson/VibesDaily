from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)
client = OpenAI(
    api_key="xai-RdMHOwRUAORjY4PD302K4v5kOHeSf9lcKMSmP9jNbpTgpphLsRu377stlkvSrXyfTP6fgCP6olVN6Nb2",
    base_url="https://api.x.ai/v1",
)

@app.route('/api/horoscope', methods=['POST'])
def horoscope():
    prompt = request.json['prompt']
    completion = client.chat.completions.create(
        model="grok-2-latest",
        messages=[
            {"role": "system", "content": "You are a cosmic guide providing detailed horoscopes."},
            {"role": "user", "content": prompt}
        ],
        stream=False,
        temperature=0,
        max_tokens=200
    )
    return jsonify({"content": completion.choices[0].message.content})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)