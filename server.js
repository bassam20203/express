const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors()); // تمكين CORS للجميع
app.use(express.json());

// تعريف نقطة نهاية لإرسال رسائل WhatsApp
app.post('/send-whatsapp', async (req, res) => {
  const { toNumber, text } = req.body;

  try {
    const response = await axios.post(
      'https://messages-sandbox.nexmo.com/v1/messages',
      {
        from: '14157386102', // رقم Sandbox الخاص بك
        to: toNumber,
        message_type: 'text',
        text: text,
        channel: 'whatsapp',
      },
      {
        auth: {
          username: 'bedb324e', // استبدل بـ API Key الخاص بك
          password: 'jvnz5OXTbCcxTepW', // استبدل بـ API Secret الخاص بك
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('خطأ في إرسال الرسالة:', error.response?.data || error.message);
    res.status(500).json({ error: 'فشل إرسال الرسالة', details: error.response?.data || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});