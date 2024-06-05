import { db } from "../../utils/db.mjs";
import { v4 as uuidv4 } from "uuid";

export const handler = async (event) => {
  try {
    const { task } = JSON.parse(event.body);

    if (typeof task !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Task must be a string" }),
      };
    }

    const params = {
      TableName: "todos",
      Item: {
        pk: "TODO",
        sk: uuidv4(),
        task: task,
      },
    };

    await db.put(params);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "TODO created successfully: " + task,
        item: params.Item,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to create TODO:" + task,
        error: error.message,
      }),
    };
  }
};
