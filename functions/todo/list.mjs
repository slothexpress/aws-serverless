import { db } from "../../utils/db.mjs";
import { response } from "../../utils/response.mjs";

export const handler = async (event) => {
  try {
    const data = await db.query({
      TableName: "todos",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "TODO",
      },
    });

    return response(200, data.Items);
  } catch (error) {
    console.error("Error querying DynamoDB", error);
    return response(500, { error: "Could not retrieve todos" });
  }
};
