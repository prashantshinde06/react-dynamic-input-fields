import { AuthProvider } from "./context";
import Routes from "./routes";
import "./app.css";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
