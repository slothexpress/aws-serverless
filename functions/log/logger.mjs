export const handler = async (event) => {
  console.log("Samis event received:", JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    const detail = JSON.parse(record.body);
    console.log("Detail:", detail);
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Sami event processed."),
  };
};
