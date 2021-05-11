import { useAuthContext } from "contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Dashboard {user?.email}</h1>
    </div>
  );
};

export default Dashboard;
