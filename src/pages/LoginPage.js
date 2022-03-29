import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [_, setMe] = useContext(AuthContext);
  const history = useHistory();

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      if (username.length < 3 || password.length < 6)
        throw new Error("입력하신 정보가 올바르지 않습니다");
      const result = await axios.patch("/users/login", { username, password });
      axios.defaults.headers.common.sessionid = result.data.sessionId;
      setMe({
        name: result.data.name,
        sessionId: result.data.sessionId,
        userId: result.data.userId,
      });
      history.push("/");
      toast.success("로그인 되었습니다");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div
      style={{
        marginTop: 100,
        maxWidth: 350,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h3>로그인</h3>
      <form onSubmit={loginHandler}>
        <CustomInput
          label="회원ID"
          vlaue={username}
          setValue={setUserName}
        ></CustomInput>
        <CustomInput
          label="비밀번호"
          type="password"
          vlaue={password}
          setValue={setPassword}
        ></CustomInput>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
