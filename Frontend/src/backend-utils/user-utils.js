import axios from "axios";
import { formatErrors } from "./handle-errors";

export const getUser = async () => {
  try {
    const response = await axios.get("users/me");
    const user = response.data.message.data;
    return {
      user,
    };
  } catch (err) {
    console.log("getUser");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const getUserPosts = async () => {
  try {
    const response = await axios.get("houses/owner");
    const houses = response.data.message.data;
    return {
      houses,
    };
  } catch (err) {
    console.log("getUserPosts");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const deleteUserPosts = async (houseId) => {
  try {

    const response = await axios.delete(`houses/${houseId}`);
    const houses = response.data.message.data;
    return {
      houses,
    };

  } catch (err) {

    console.log("deleteUserPosts");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };

  }
};

export const publishUserPosts = async (data) => {
  try {
    console.log({ data })

    var formdata = new FormData();
    formdata.append("category", data.category);
    formdata.append("description", data.description);
    formdata.append("postedBy", data.postedBy);
    formdata.append("price", data.price);
    formdata.append("title", data.title);
    formdata.append("latitude", data.latitude);
    formdata.append("longitude", data.longitude);

    formdata.append("NewImageFile", data.imageCover.file, data.imageCover.file.name);

    const response = await axios.post(`houses`, formdata);

    const house = response.data.message.data;
    console.log("house", house);
    return {
      house,
    };
  } catch (err) {
    console.log("publishUserPosts");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const updateUser = async (data) => {
  try {
    console.log({ data });
    const response = await axios.patch("users/me/update", data);
    const user = response.data.message.data;
    return {
      user,
    };
  } catch (err) {
    console.log("updateUser");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    const response = await axios.patch("users/me/changePassword", {
      currentPassword: oldPassword,
      newPassword,
    });
    const user = response.data.message.data;
    return {
      user,
    };
  } catch (err) {
    console.log("changePassword");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const followUser = async (userId) => {
  try {
    const response = await axios.post("users/follow", {
      targetId: userId,
    });
    return {
      error: undefined,
    };
  } catch (err) {
    console.log("followUser");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};

export const unFollowUser = async (userId) => {
  try {
    const response = await axios.delete("users/follow", {
      data: { targetId: userId },
    });
    console.log(response);
    return {
      error: undefined,
    };
  } catch (err) {
    console.log("unFollowUser");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};
