import axios from 'axios';
import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { OPENAI_API_KEY } from '@env';

const ChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const callChatGPT = async () => {
    if (!inputText.trim()) return;

    const newMessages = [...messages, { role: 'user', content: inputText }];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: newMessages.map(msg => ({ role: msg.role, content: msg.content })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          }
        }
      );

      setMessages([...newMessages, { role: 'assistant', content: response.data.choices[0].message.content }]);
      setInputText('');
    } catch (error) {
      console.error('Error calling GPT API:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageWrapper}>
      <View style={[styles.messageContainer, item.role === 'user' ? styles.userMessage : styles.gptMessage]}>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>Chat Bot</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
        />
        <TouchableOpacity onPress={callChatGPT} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    padding: 10,
  },
  messageWrapper: {
    justifyContent: 'flex-start',
    marginVertical: 5,
    paddingHorizontal: 3,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 15,
    marginVertical: 5,
    borderRadius: 20, // เพิ่มความโค้งให้กับกรอบ
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20, // เพิ่มความโค้งให้ดูนุ่มนวลขึ้น
  },
  gptMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#444',
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 20,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 35,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginLeft: 10,
    backgroundColor: '#0084ff',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    fontSize: 28,           
    fontWeight: 'bold',
    color: 'rgba(0, 128, 0, 0.7)',         
    textAlign: 'center',       
    paddingVertical: 15,      
    borderBottomWidth: 1,       
    borderColor: '#ddd',    
  },
});

export default ChatScreen;
