import React, { useState, useEffect } from "react";
import { supabase } from "../../util/supabase";
import styled from "styled-components";
import Link from "next/link";
import router from "next/router";

const Sidebar = () => {
  const user = supabase.auth.user();
  const [chatList, setChatList] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data, error }: any = await supabase
        .from("chat")
        .select("id, title, created_at")
        .contains("users", [user.id]);
      setChatList(data);
    };
    fetch();
  }, []);
  return (
    <SidebarArea>
      <Title>チャット一覧</Title>
      <List>
        {chatList &&
          chatList.map((chat: any, index: number) => (
            <ListItem chat_id={chat.id} key={index}>
              <Inner>
                <Link
                  href={`/chat/${chat.id}`}
                  as={`/chat/${chat.id}`}
                  passHref
                >
                  <LinkText>{chat.title}</LinkText>
                </Link>
              </Inner>
            </ListItem>
          ))}
      </List>
    </SidebarArea>
  );
};

export default Sidebar;

const SidebarArea = styled.aside`
  padding: 0 10px;
  width: calc(100% / 5);
  border-right: 2px solid #2b3a42;
  box-sizing: border-box;
`;
const Title = styled.h2`
  padding: 15px 0;
  font-size: 18px;
  font-weight: 700;
  color: #2b3a42;
`;
const List = styled.ul``;
const ListItem = styled.li<{ listFlex: any }>`
  justify-content: ${props =>
    props.chat_id == router.query.id ? "just" : "blue"};
`;
const Inner = styled.div<{ listFlex: any }>`
  justify-content: ${props =>
    props.chat_id == router.query.id ? "just" : "blue"};
`;
const LinkText = styled.a`
  padding: 10px 5px;
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #2b3a42;
`;
