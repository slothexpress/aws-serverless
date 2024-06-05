import { db } from "../../utils/db.mjs";
import { response } from "../../utils/response.mjs";

export const handler = async (event) => {
  const { id } = event.pathParameters;

  try {
    const data = await db.get({
      TableName: "todos",
      Key: {
        pk: "TODO",
        sk: id,
      },
    });

    if (!data.Item) {
      return response(404, { error: "TODO not found for id: " + id });
    }

    return response(200, data.Item);
  } catch (error) {
    console.error("Error retrieving TODO from DynamoDB", error);
    return response(500, { error: "Could not retrieve TODO" });
  }
};
