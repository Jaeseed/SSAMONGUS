package me.silvernine.tutorial.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Message {
    private String roomId;
    private String writer;
    private String content;
}
