import { useState } from "react";
import "./App.css";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import Layout from "./components/Layout";
let id = 3;
const App = () => {
  const [feedbackCollection, setFeedbackCollection] = useState([
    {
      id: 1,
      rating: 10,
      feedback: "Feedback 1",
    },
    { id: 2, rating: 8, feedback: "Feedback 2" },
  ]);
  const add = (dt) => {
    dt.id = id++;
    setFeedbackCollection([...feedbackCollection, dt]);
  };
  return (
    <Layout>
      <FeedbackForm submit={add}></FeedbackForm>
      <FeedbackList
        items={feedbackCollection.sort((a, b) => (b.id > a.id ? 1 : -1))}
      ></FeedbackList>
    </Layout>
  );
};

export default App;
