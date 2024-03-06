import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <Router basename="/insight">
      <React.StrictMode>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Routes>
              <Route
                index
                element={
                  <>
                    <PageTitle title="XSquare Insight" />
                    <ECommerce />
                  </>
                }
              />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forms/form-elements" element={<FormElements />} />
              <Route path="/forms/form-layout" element={<FormLayout />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/ui/alerts" element={<Alerts />} />
              <Route path="/ui/buttons" element={<Buttons />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
            </Routes>
          </>
        )}
      </React.StrictMode>
    </Router>
  );
}

export default App;
