import Login from './Components/Login';
import Signup from './Components/signup';
import TodoApp from './Components/TodoApp';
import ForgotPassword from './Components/ForgotPassword';
import EnterOtp from './Components/EnterOtp';
import NewPassword from './Components/NewPassword';

function App() {
  return (
    <>
      <Login/>
      <Signup/>
      <ForgotPassword/>
      <EnterOtp/>
      <NewPassword/>
      <TodoApp/>
    </>
  );
}

export default App;
