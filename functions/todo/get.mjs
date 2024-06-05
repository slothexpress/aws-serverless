import { db } from "../../utils/db.mjs";
import { response } from "../../utils/response.mjs";

export const handler = async (event) => {
  const { id } = event.pathParameters;

  const sampleTodo = {
    id: id,
    task: "Sami Shower!",
  };

  return response(200, sampleTodo);
};
