import { db } from "../../utils/db.mjs";

export const handler = async (event) => {
  return {
    statusCode: 200,
    body: "DELETE " + event.pathParameters.id,
  };
};
