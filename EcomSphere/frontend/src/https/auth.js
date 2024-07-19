import { server } from "../main";

// function to sendOTP

export const sendOTP = async (email, isLogin, password) => {
  let data;
  if (isLogin === true) {
    data = { email: email, isLogin: isLogin, password: password };
  } else {
    data = { email: email, isLogin: isLogin };
  }

  const res = await fetch(server + "/otp/send-otp", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  return resData;

  //   if (!res.ok || res.status !== 200) {
  //     return resData.message;
  //   }
};

export const register = async (email, name, password, otp) => {
  const res = await fetch(server + "/auth/signup", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
      otp: otp,
    }),
  });

  const resData = await res.json();

  return resData;
};

export const login = async (email, password, otp) => {
  const res = await fetch(server + "/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      otp: otp,
    }),
  });

  const resData = await res.json();

  return resData;
};
