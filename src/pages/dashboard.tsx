import { useAuthContext } from "contexts/AuthContext";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { setupAPIClient } from "services/api";
import { api } from "services/apiClient";
import { withSSRAuth } from "utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useAuthContext();

  useEffect(() => {
    api.get("/me").then((response) => console.log(response));
  }, []);

  return (
    <div>
      <h1>Dashboard {user?.email}</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");
    console.log("🚀 ~ file: dashboard.tsx ~ line 26 ~ response", response)

    return {
      props: {},
    };
  }
);
