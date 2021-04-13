import React, { useState, useRef, useEffect, useContext } from "react";
import { ThemeHandler } from "./App.js";
import Tooltip from "./Tooltip.js";
import styled from "styled-components";
import { BsChevronDown } from "react-icons/bs";
import { BsSquareFill } from "react-icons/bs";
import { CgDarkMode } from "react-icons/cg";

const MessageList = styled.ol`
    overflow-y: scroll;
    height: 100%;
    margin: 0;
    font-size: 0.8rem;
    padding-left: 0;
    flex: 1 1 0;

    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        color: ${props => props.theme.backgroundColorAlt};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.color};
    }

    & li {
        padding: 0.25rem;
        list-style: none;
    }
`;

const MessageInputContainer = styled.div`
    flex: 0 0 auto;
    display: flex;
    height: 40px;
    padding: 3px;
`;

const MessageInput = styled.input`
    flex-grow: 1;
    padding: 0.3rem 0.5rem;
    border-radius: 5px;
    outline: 0;
    border: solid 1px;
    background-color: ${props => props.theme.backgroundColorInput};
    caret-color: ${props => props.theme.colorCaret};
    color: ${props => props.theme.colorInputNotFocused};

    &:focus {
        border-color: ${props =>
            props.player === 1 ? props.theme.colorRed : props.theme.colorBlue};
        border-width: 3px;
        background-color: ${props => props.theme.backgroundColorInputFocus};
        color: ${props => props.theme.color};
    }

    &::placeholder {
        color: ${props => props.theme.colorInputNotFocused};
        opacity: 1;
    }

    &:focus::placeholder {
        color: ${props => props.theme.color};
    }
`;

const MessageLabel = styled.span`
    color: ${props =>
        props.author === "1" ? props.theme.colorRed : props.theme.colorBlue};
`;

const Down = styled(BsChevronDown)`
    margin-left: 5px;
    font-size: 22px;
`;

const Message = styled.li``;

const ChatContainer = styled.div`
    position: relative;
    flex: 1 1 0;
    overflow: hidden;
`;

const Header = styled.div`
    font-size: 0.9rem;
    background-color: ${props => props.theme.backgroundColorAlt};
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const IconButton = styled.button`
    flex: 0 0 auto;
    display: inline-flex;
    padding: 0.4rem;
    outline: 0;
    cursor: pointer;
    border-radius: 5px;
    background-color: transparent;
    border: 0;
    color: ${props => props.theme.color};
    font-weight: 600;

    &:hover {
        background-color: ${props => props.theme.backgroundColorInput};
    }
`;

const NewMessagesButton = styled.div`
    position: absolute;
    bottom: 0;
    transition: transform 0.5s;
    ${props => !props.isVisible && "transform: translateY(100%);"}

    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    outline: 0;
    cursor: pointer;
    background-color: #383838;
    border-radius: 5px 5px 0 0;
    border: 0;
    color: white;
    font-weight: 600;

    &:hover {
        background-color: #009c95;
    }
`;

const Window = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    min-height: 250px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

    color: ${props => props.theme.color};
    background-color: ${props => props.theme.backgroundColor};
`;

export default function Chat({ messages, onSend, player }) {
    const [message, setMessage] = useState("");
    const [buttonVisible, setShowButton] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const chatContainer = useRef(null);
    const previousScrollHeight = useRef(null);
    const toggleTheme = useContext(ThemeHandler);

    useEffect(() => {
        if (isScrolledToBottom()) {
            scrollToBottom();
        } else {
            showNewMessagesButton();
        }
        previousScrollHeight.current = chatContainer.current.scrollHeight;
    }, [messages]);

    const toggleVisible = () => {
        setIsVisible(isVisible => !isVisible);
    };

    const handleChange = event => {
        setMessage(event.target.value);
    };

    const handleSubmit = event => {
        if (onSend) {
            onSend(message);
        }
        setMessage("");
    };

    const renderMessages = () => {
        return messages.map((message, index) => (
            <Message>
                <MessageLabel author={message.author}>
                    {`[${message.author === "1" ? "red" : "blue"}]: `}
                </MessageLabel>
                {message.message}
            </Message>
        ));
    };

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const scrollToBottom = () => {
        chatContainer.current.scroll({
            top: chatContainer.current.scrollHeight,
            left: 0,
            behavior: "smooth"
        });
    };

    const isScrolledToBottom = () => {
        const container = chatContainer.current;
        return (
            container.scrollTop + container.offsetHeight >=
            previousScrollHeight.current
        );
    };
    const showNewMessagesButton = () => {
        setShowButton(true);
    };

    return (
        <Window>
            <Header>
                Chat
                <Tooltip placement="left" labelText="darkmode on/off">
                    <IconButton onClick={toggleTheme}>
                        <CgDarkMode />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    placement="left"
                    labelText={isVisible ? "Hide Chat" : "Show Chat"}
                >
                    <IconButton
                        onClick={toggleVisible}
                        style={{ color: isVisible ? "green" : "red" }}
                    >
                        <BsSquareFill />
                    </IconButton>
                </Tooltip>
            </Header>
            <ChatContainer>
                {isVisible ? (
                    <MessageList
                        ref={chatContainer}
                        onScroll={() => setShowButton(false)}
                    >
                        {renderMessages()}
                    </MessageList>
                ) : null}
                <NewMessagesButton
                    isVisible={buttonVisible}
                    onClick={scrollToBottom}
                >
                    New Messages
                    <Down />
                </NewMessagesButton>
            </ChatContainer>
            {isVisible ? (
                <MessageInputContainer>
                    <MessageInput
                        type="text"
                        value={message}
                        player={player}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        aria-label="Send a chat message"
                        placeholder="Send a chat message"
                    />
                </MessageInputContainer>
            ) : null}
        </Window>
    );
}
