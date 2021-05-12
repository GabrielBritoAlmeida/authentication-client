import { useAuthContext } from "contexts/AuthContext";
import { useEffect } from "react";
import { api } from "services/api";

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    api.get("/me").then((response) => console.log(response));
  }, []);

  return (
    <div>
      <h1>Dashboard {user?.email}</h1>
    </div>
  );
};

export default Dashboard;
