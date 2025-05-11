export const sendMessage = (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ success: false, error: 'Повідомлення не може бути порожнім' });
  }

  console.log('Нове повідомлення:', message);
  res.json({ success: true, response: `Отримано повідомлення: ${message}` });
};
