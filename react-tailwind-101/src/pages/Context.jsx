import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect } from "react";
import FormLayout from "../components/FormLayout";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import UserContext from "../context/userContext";
import useForm from "../hooks/useForm";

const Context = () => {
  const { userValue, setUserValue } = useContext(UserContext);
  const {
    formInfo: formData,
    update: setFormData,
    validateAll: validateForm,
  } = useForm({
    name: {
      value: "",
      validation: (val) => val.trim().length >= 2,
      validationMsg: "Please enter valid name",
      lazyValidation: true,
    },
  });
  useEffect(() => {
    if (userValue.name) setFormData("name", userValue.name);
    else setFormData("name", "");
  }, [userValue]);
  return (
    <Layout>
      <div className="flex w-full flex-col space-y-2">
        <span className="text-green-700 font-semibold text-lg">
          Context Api
        </span>
        <AnimatePresence>
          {!userValue.name ? (
            <AnimatePresence>
              {userValue && userValue.loading ? (
                <motion.div key={1}>
                  <Loader></Loader>
                </motion.div>
              ) : (
                <motion.div
                  className="w-full  justify-center flex"
                  key={2}
                  initial={{ opacity: 0, y: "-10vh" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0, y: "-10vh" }}
                >
                  <div className="w-full lg:w-6/12 xl:w-4/12">
                    <FormLayout
                      title="Sign In"
                      submitHandler={(e) => {
                        e.preventDefault();
                        validateForm();
                        if (!formData["name"].error)
                          setUserValue(formData["name"].value);
                      }}
                    >
                      <div className="flex flex-col">
                        <label>Name</label>
                        <input
                          type="text"
                          onInput={({ target }) => {
                            setFormData("name", target.value.trim());
                          }}
                          className={`appearance-none outline-none py-1 px-3 rounded-lg  transition-all duration-300 ease-in
                        ${
                          formData["name"].error
                            ? "border-2 border-red-500"
                            : "border-2 border-blue-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        }`}
                        />
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <motion.div
              key={3}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-start space-y-1"
            >
              <span>Welcome {userValue.name} !</span>
              <button
                className="outline-none appearance-none py-2 px-4 bg-white hover:opacity-90 rounded
                           text-gray-600 shadow
                            focus:ring focus:ring-gray-300 transition-all ease-in duration-300"
                onClick={() => setUserValue("")}
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Context;
