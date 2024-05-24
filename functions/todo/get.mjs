import { db } from "../utils/db.mjs";

export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "SAMI Go Serverless v3.0!",
        input: event,
      },
      null,
      2
    ),
  };
};
