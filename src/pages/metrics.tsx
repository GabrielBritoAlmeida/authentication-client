import { Can } from "components/Cant";
import { useAuthContext } from "contexts/AuthContext";
import { useCan } from "hooks/useCan";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { setupAPIClient } from "services/api";
import { api } from "services/apiClient";
import { withSSRAuth } from "utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useAuthContext();

  return <h1>Metrics {user?.email}</h1>;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);
