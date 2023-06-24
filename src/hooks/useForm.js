import { useState, useCallback } from "react";
import isEmail from 'validator/es/lib/isEmail';

const useForm = () => {
  const [enteredValues, setEnteredValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setEnteredValues({
      ...enteredValues,
      [name]: value,
    });

    if (name === "email") {
      if (!isEmail(value)) {
        event.target.setCustomValidity('Введите корректный e-mail');
      } else {
        event.target.setCustomValidity("");
      }
    }

    setEnteredValues({ ...enteredValues, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsFormValid(event.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setEnteredValues, setErrors, setIsFormValid]
  );

  return {
    enteredValues,
    errors,
    handleChange,
    isFormValid,
    resetForm,
    setIsFormValid,
    setEnteredValues,
  };
};

export default useForm;
