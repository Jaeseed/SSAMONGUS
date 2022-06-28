package me.silvernine.tutorial.entity;

import me.silvernine.tutorial.dto.MessageDto;

public class ChatMessage {
    private MessageDto type;
    private String content;
    private String sender;

    public MessageDto getType() {
        return type;
    }

    public void setType(MessageDto type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
