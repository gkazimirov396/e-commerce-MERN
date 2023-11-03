export const handleFormErrors = error => {
  const validationErrors = error.data.payload;

  return validationErrors.reduce((errors, err) => {
    errors[err.path] = err.msg;

    return errors;
  }, {});
};
