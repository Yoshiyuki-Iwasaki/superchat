import React, { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../../util/supabase";
import styled from "styled-components";

export type ChatAvatarType = {
  userId: any;
};

const ChatAvatar: React.FC<ChatAvatarType> = ({ userId }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", userId);
      setUserData(data);
      if (error) throw new Error();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Avatar>
      {/* <Image src={`/avatar.png`} width={40} height={40} /> */}
      {userData[0] && <Username>{userData[0].fullname}</Username>}
    </Avatar>
  );
};

export default ChatAvatar;

const Avatar = styled.div``;
const Username = styled.p`
  font-size: 12px;
  color: #2b3a42;
  font-weight: 700;
`;
