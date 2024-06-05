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
      return response(404, {
        error: "Nothing to delete. TODO not found for id: " + id,
      });
    }

    await db.delete({
      TableName: "todos",
      Key: {
        pk: "TODO",
        sk: id,
      },
    });

    return response(200, { message: "Deleted TODO with id: " + id });
  } catch (error) {
    console.error("Error deleting TODO from DynamoDB", error);
    return response(500, { error: "Could not delete TODO" });
  }
};
