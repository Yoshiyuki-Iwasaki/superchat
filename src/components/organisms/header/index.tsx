import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Presenter from './presenter';

const Header = () => {
  const [userList, setUserList] = useState([]);
  const router = useRouter();

  const signOut = () => {
    router.push('./signin');
  };

  return <Presenter userList={userList} />;
};

export default Header;
