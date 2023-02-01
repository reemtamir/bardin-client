import joi from 'joi';
export const formikValidateUsingJoi = (schema) => {
  return (values) => {
    const { error } = joi
      .object(schema)
      .validate(values, { abortEarly: false });
    if (!error) {
      return null;
    }
    const errors = {};

    for (const detail of error.details) {
      const errorKey = detail.path[0];
      errors[errorKey] = detail.message;
    }

    return errors;
  };
};
