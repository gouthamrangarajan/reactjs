import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import Form1 from "../components/Form1";
import Form2 from "../components/Form2";
import FormSubmitResult from "../components/FormSubmitResult";

const Form = () => {
  const firstEl = useRef(null);
  const [formSubmitResultData, setFormSubmitResultData] = useState(null);
  useEffect(() => {
    firstEl.current.focus();
  }, [firstEl]);
  return (
    <Layout>
      <div className="flex w-full flex-col space-y-2">
        <span className="text-green-700 font-semibold text-lg">Form</span>
        <div className="grid gird-cols-1 lg:grid-cols-3 gap-4 w-full items-center">
          <Form1 firstEl={firstEl} submit={setFormSubmitResultData}></Form1>
          <Form2 submit={setFormSubmitResultData}></Form2>
          <FormSubmitResult
            jsonResult={formSubmitResultData}
          ></FormSubmitResult>
        </div>
      </div>
    </Layout>
  );
};

export default Form;
