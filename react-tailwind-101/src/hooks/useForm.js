//Custom hook for simple form data storage & validation

import { useState } from "react";

const useForm = (formInfo) => {
  const [formInfoState, setFormInfoState] = useState(formInfo);

  const update = (key, val) => {
    let newDt = formInfoState[key];
    newDt.value = val;
    if (newDt.validation && !newDt.lazyValidation)
      newDt.error = !newDt.validation(newDt.value);
    setFormInfoState({ ...formInfoState });
  };
  const validateAll = () => {
    Object.keys(formInfoState).forEach((ky) => {
      let el = formInfoState[ky];
      if (el.validation) el.error = !el.validation(el.value);
    });
    setFormInfoState({ ...formInfoState });
  };
  return { formInfo: formInfoState, update, validateAll };
};
export default useForm;
