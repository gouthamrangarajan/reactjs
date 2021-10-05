import { lazy, Suspense, useState } from "react";
import Nav from "./components/Nav";
import Menu from "./components/Menu";
const PhotosGrid = lazy(() => import("./pages/PhotosGrid"));
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
const UsersTable = lazy(() => import("./pages/UsersTable"));
const Modal = lazy(() => import("./pages/Modal"));
const Form = lazy(() => import("./pages/Form"));
const Context = lazy(() => import("./pages/Context"));
import Loader from "./components/Loader";
import UserContext from "./context/userContext";
import useUser from "./hooks/useUser";
function App() {
  const { userValue, setUser: setUserValue } = useUser();
  return (
    <UserContext.Provider value={{ userValue, setUserValue }}>
      <Router>
        <Nav></Nav>
        <Menu></Menu>
        <div className="mt-2 flex flex-col space-y-2 w-11/12 max-w-7xl mx-auto mb-2">
          <Switch>
            <Route exact path="/users">
              <Suspense fallback={<Loader></Loader>}>
                <UsersTable></UsersTable>
              </Suspense>
            </Route>
            <Route exact path="/modal">
              <Suspense fallback={<Loader></Loader>}>
                <Modal></Modal>
              </Suspense>
            </Route>
            <Route exact path="/form">
              <Suspense fallback={<Loader></Loader>}>
                <Form></Form>
              </Suspense>
            </Route>
            <Route exact path="/context">
              <Suspense fallback={<Loader></Loader>}>
                <Context></Context>
              </Suspense>
            </Route>
            <Route exact path="/">
              <Suspense fallback={<Loader></Loader>}>
                <PhotosGrid></PhotosGrid>
              </Suspense>
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
