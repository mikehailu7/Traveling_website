import axios from "axios";
import { formatErrors } from "./handle-errors";

export const postReview = async (houseId, review) => {
  try {
    const response = await axios.post(`houses/${houseId}/reviews`, {
      house: houseId,
      ...review,
    });
    const houses = response.data.message.data;

    return {
      houses,
    };
  } catch (err) {
    console.log("postReview");
    console.log(err.response);
    return {
      error: formatErrors(err),
    };
  }
};
