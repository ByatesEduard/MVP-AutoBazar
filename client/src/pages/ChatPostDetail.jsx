import { useState } from 'react';


const ChatPostDetails = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    const result = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await result.json();
    if (data.success) {
      setResponse(data.response);
    } else {
      setResponse('Щось пішло не так.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Напишіть повідомлення"
      />
      <button onClick={handleSendMessage}>Відправити</button>

      {response && <p>{response}</p>} {/* Відображення відповіді */}
    </div>
  );
};

export default ChatPostDetails;

