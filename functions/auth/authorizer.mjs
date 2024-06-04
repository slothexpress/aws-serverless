export const handler = async (event) => {
  let response = {
    isAuthorized: false,
  };

  if (event.headers.Authorization === "secretKey") {
    response = {
      isAuthorized: true,
      context: {
        role: "admin",
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
