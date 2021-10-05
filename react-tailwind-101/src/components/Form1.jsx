import { FaAngleDown } from "react-icons/fa";
import useForm from "../hooks/useForm";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FormLayout from "./FormLayout";

const Form1 = ({ firstEl, submit }) => {
  const [showValidation, setShowValidation] = useState(false);
  const {
    formInfo: formData,
    update: updateFormData,
    validateAll: validateForm,
  } = useForm({
    input: {
      value: "",
      validation: (val) => val.trim() != "",
      validationMsg: "Please enter valid value",
    },

    select: {
      value: "Option 1",
    },
  });

  return (
    <FormLayout
      title="Form 1"
      submitHandler={(e) => {
        e.preventDefault();
        validateForm();
        setShowValidation(true);
        if (!formData["input"].error)
          submit({
            input: formData["input"].value,
            select: formData["select"].value,
          });
      }}
    >
      <div className="flex flex-col space-y-1">
        <label>Input</label>
        <input
          ref={firstEl}
          onInput={({ target }) => {
            setShowValidation(false);
            updateFormData("input", target.value.trim());
          }}
          type="text"
          className={`appearance-none outline-none py-1 px-3 rounded-lg  transition-all duration-300 ease-in
                        ${
                          formData["input"].error
                            ? "border-2 border-red-500"
                            : "border-2 border-blue-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        }`}
          placeholder="Text..."
        />

        <AnimatePresence>
          {formData["input"].error && showValidation && (
            <motion.span
              className="text-xs lg:text-sm italic text-red-600"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              *{formData["input"].validationMsg}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col space-y-1">
        <label>Select</label>
        <div
          className="flex rounded-lg border-2 border-blue-500 focus-within:border-transparent
             transition-all duration-300 ease-in focus-within:ring-2 focus-within:ring-blue-500"
        >
          <select
            className="appearance-none outline-none py-1 px-3 flex-1 rounded-lg"
            onInput={({ target }) => {
              updateFormData("select", target.value);
            }}
          >
            {["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"].map(
              (el) => (
                <option key={el}>{el}</option>
              )
            )}
          </select>
          <div className="relative">
            <FaAngleDown className="w-4 h-4 text-gray-600 absolute top-0 right-0 mr-2 mt-2"></FaAngleDown>
          </div>
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

export default Form1;
