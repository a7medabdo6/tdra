import { useEffect, useState } from "react";

const CurrentUser = () => {
  const [user, setCurrentUser] = useState(null);
  useEffect(() => {
    const userinfo = localStorage.getItem("user");
    setCurrentUser(JSON.parse(userinfo ? userinfo : ""));
  }, []);

  return { user };
};

export default CurrentUser;
