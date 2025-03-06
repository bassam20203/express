from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# نقطة نهاية لإرسال رسائل WhatsApp
@app.route('/send-whatsapp', methods=['POST'])
def send_whatsapp():
    data = request.json
    to_number = data.get("toNumber")
    text = data.get("text")

    url = "https://messages-sandbox.nexmo.com/v1/messages"
    payload = {
        "from": "14157386102",  # رقم Sandbox الخاص بك
        "to": to_number,
        "message_type": "text",
        "text": text,
        "channel": "whatsapp",
    }
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    auth = ("bedb324e", "jvnz5OXTbCcxTepW")  # استبدل بـ API Key و API Secret

    try:
        response = requests.post(url, json=payload, headers=headers, auth=auth)
        response_data = response.json()
        return jsonify(response_data), response.status_code
    except Exception as e:
        return jsonify({"error": "فشل إرسال الرسالة", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3001)  # تشغيل الخادم على المنفذ 3001
