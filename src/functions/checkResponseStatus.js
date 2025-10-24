const checkResponseStatus = (response) => {
  if (response.status !== 200) {
    const errorData = response.data || "API request failed";
    const error = new Error(errorData);
    error.status = response.status;

    if (response.status === 401) {
      error.message = "Unauthorized";
    } else if (response.status === 404) {
      error.message = "Resource not found";
    } else if (response.status >= 500) {
      error.message = "Internal server error";
    }
    throw error;
  }
};
export default checkResponseStatus;
