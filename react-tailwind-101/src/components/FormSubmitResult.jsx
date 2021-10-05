import { motion, AnimatePresence } from "framer-motion";
import FormLayout from "./FormLayout";

const FormSubmitResult = ({ jsonResult }) => {
  return (
    <FormLayout title="Result">
      <AnimatePresence>
        {jsonResult && (
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {JSON.stringify(jsonResult, null, 2)}
          </motion.pre>
        )}
      </AnimatePresence>
    </FormLayout>
  );
};

export default FormSubmitResult;
