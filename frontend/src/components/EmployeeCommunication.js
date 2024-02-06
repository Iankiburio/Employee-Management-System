import React from 'react';
import Section from './Section';
import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './ChatFeed';
import LoginForm from './LoginForm';
import '../css/EmployeeCommunication.css';

const projectID = '00408fb7-c995-4ddf-a786-6edfb2c4e935';


function EmployeeCommunication() {
  if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <Section>
        {
            <ChatEngine
            height="100vh"
            projectID={projectID}
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            
          /> }
    </Section>
  );
}

export default EmployeeCommunication;