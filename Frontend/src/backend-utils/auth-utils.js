import axios from "axios";
import { formatErrors } from "./handle-errors";
export const loginBackend = async ({ email, password }) => {
  try {
    const response = await axios.post("auth/login", {
      email,
      password,
    });

    const token = response.data.token;
    const user = response.data.message.data;
    return {
      token,
      user,
    };
  } catch (err) {
    console.log(err.response);

    return {
      error: formatErrors(err),
    };
  }
};

export const registerBackend = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
}) => {
  try {
    const response = await axios.post("auth/register", {
      firstname: firstName,
      lastname: lastName,
      email,
      phone: phoneNumber,
      password,
    });
    const user = response.data.message.data;
    return {
      user,
    };
  } catch (err) {
    console.log(err.response);

    return {
      error: formatErrors(err),
    };
  }
};
