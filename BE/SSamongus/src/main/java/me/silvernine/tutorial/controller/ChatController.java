package me.silvernine.tutorial.controller;

import lombok.extern.log4j.Log4j2;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import me.silvernine.tutorial.entity.ChatMessage;
import me.silvernine.tutorial.dto.ChatMessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Log4j2
@Controller
@RequiredArgsConstructor
public class ChatController {
    @MessageMapping("/chat.sendMessage/{id}") // 메시지 보낼때 여기로 날라감
    @SendTo("/topic/chat/{id}") // 여기로 받아오는 거
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage, @DestinationVariable("id") Long id) {
        System.out.println(chatMessage.getContent());
        return chatMessage;
    }

    @MessageMapping("/chat.addUser/{id}")
    @SendTo("/topic/chat/{id}")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor, @DestinationVariable("id") Long id){
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

//    @Autowired
//    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
//
//    //Client가 SEND할 수 있는 경로
//    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
//    //"/pub/chat/enter"
//    @MessageMapping(value = "/chat/enter")
//    public void enter(ChatMessageDto message){
//        message.setMessage(message.getWriter() + "님이 채팅방에 참여하였습니다.");
//        template.convertAndSend("/topic/chat/room/git " + message.getRoomId(), message);
//    }
//
//    @MessageMapping(value = "/chat/message")
//    public void message(ChatMessageDto message){
//        template.convertAndSend("/topic/chat/room/" + message.getRoomId(), message);
//    }
}
