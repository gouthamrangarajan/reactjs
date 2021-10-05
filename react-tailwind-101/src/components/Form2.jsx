import useForm from "../hooks/useForm";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FormLayout from "./FormLayout";

const Form2 = ({ submit }) => {
  const [showValidation, setShowValidation] = useState(false);
  const {
    formInfo: formData,
    update: updateFormData,
    validateAll: validateForm,
  } = useForm({
    checkbox: {
      value: "",
    },
    radio: {
      value: "",
      validation: (val) => ["Radio 1", "Radio 2", "Radio 3"].includes(val),
      validationMsg: "Please select a value",
    },
  });
  return (
    <FormLayout
      title="Form 2"
      submitHandler={(e) => {
        e.preventDefault();
        validateForm();
        setShowValidation(true);
        if (!formData["radio"].error)
          submit({
            checkbox: formData["checkbox"].value,
            radio: formData["radio"].value,
          });
      }}
    >
      <div className="flex flex-col space-y-1">
        <label>Checkbox</label>
        <Checkbox
          label="Yes"
          checked={formData["checkbox"].value == "Yes" ? true : false}
          name="Yes"
          onChange={() => {
            formData["checkbox"].value == "Yes"
              ? updateFormData("checkbox", "")
              : updateFormData("checkbox", "Yes");
          }}
        ></Checkbox>
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex flex-col lg:flex-row lg:space-x-1 lg:items-center">
          <label>Radio</label>
          <AnimatePresence>
            {formData["radio"].error && showValidation && (
              <motion.span
                className="text-xs lg:text-sm italic text-red-600"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                *{formData["radio"].validationMsg}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col xl:flex-row xl:space-x-2">
          <Radio
            name="radio"
            label="Radio 1"
            checked={formData["radio"].value == "Radio 1"}
            onChange={() => updateFormData("radio", "Radio 1")}
          ></Radio>
          <Radio
            name="radio"
            label="Radio 2"
            checked={formData["radio"].value == "Radio 2"}
            onChange={() => updateFormData("radio", "Radio 2")}
          ></Radio>
          <Radio
            name="radio"
            label="Radio 3"
            checked={formData["radio"].value == "Radio 3"}
            onChange={() => updateFormData("radio", "Radio 3")}
          ></Radio>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="outline-none appearance-none py-2 px-4 bg-green-600 hover:opacity-90 rounded text-white shadow 
                      focus:ring focus:ring-green-300 transition-all ease-in duration-300"
        >
          Submit
        </button>
      </div>
    </FormLayout>
  );
};

export default Form2;
