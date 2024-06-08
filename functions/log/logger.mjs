export const handler = async (event) => {
  console.log("+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + ");
  console.log("Samis event received:");
  console.log(event);
  console.log("+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + ");
  return {
    statusCode: 200,
    body: JSON.stringify("Sami event processed."),
  };
};
