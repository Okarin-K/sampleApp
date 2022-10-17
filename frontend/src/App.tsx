import { Box, Container, FormControl, Heading, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import './App.css';
import CreateButton from './components/createButton';

function App() {
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const getMessages = async () => {
            const response = await fetch('http://localhost:5000/messages');
            const json = await response.json();

            setMessages(json.messages);
        };

        getMessages();
    }, []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const addMessage = async () => {
            const data = {
                message: text,
            };
            await fetch('http://localhost:5000/messages', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        };

        addMessage();
        setText('');
    };

    return (
        <Container textAlign="center">
            <Heading>Talked myself</Heading>
            <Text>ひとりごとをつぶやけます。だれにも共有されません</Text>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Input
                        type="text"
                        m={4}
                        placeholder="つぶやく内容を入力してね！"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></Input>
                    <CreateButton />
                </FormControl>
            </form>
            {messages.map((_, index) => (
                <Box key={`message-id-${index}`} w="100%" p={4} m={4} borderWidth="1px" borderRadius="lg">
                    <Text textAlign="left">{_.message}</Text>
                    <Text textAlign="right">{_.createdAt}</Text>
                </Box>
            ))}
        </Container>
    );
}

export default App;
