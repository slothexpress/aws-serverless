import { db } from "../../utils/db.mjs";
import { v4 as uuidv4 } from "uuid";
import { EventBridge } from "@aws-sdk/client-eventbridge";

const eventBridge = new EventBridge({ region: "eu-north-1" });

export const handler = async (event) => {
  try {
    const { task } = JSON.parse(event.body);

    if (typeof task !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Task must be a string" }),
      };
    }

    const id = uuidv4();

    const params = {
      TableName: "todos",
      Item: {
        pk: "TODO",
        sk: id,
        task: task,
      },
    };

    await db.put(params);

    console.log("SAMI CREATE TODO OK");

    const eventParams = {
      Entries: [
        {
          Source: "todo.put",
          EventBusName:
            "arn:aws:events:eu-north-1:655905758223:event-bus/default",
          DetailType: "TODO Created",
          Detail: JSON.stringify({ id, task }),
        },
      ],
    };

    console.log("SAMI RAISE EVENT OK");

    await eventBridge.putEvents(eventParams);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "TODO created successfully!",
        item: params.Item,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to create TODO: " + task,
        error: error.message,
      }),
    };
  }
};
