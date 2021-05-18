import { Can } from "components/Cant";
import { useAuthContext } from "contexts/AuthContext";
import { useCan } from "hooks/useCan";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { setupAPIClient } from "services/api";
import { api } from "services/apiClient";
import { withSSRAuth } from "utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useAuthContext();

  const useCanSeeMetrics = useCan({
    permissions: ["metrics.list"],
  });

  useEffect(() => {
    api.get("/me").then((response) => console.log(response));
  }, []);

  if (!useCanSeeMetrics) return <p>Sem permissão no momento.</p>;

  return (
    <Can>
      <h1>Dashboard {user?.email}</h1>
      <br/>
      <button onClick={()=> signOut()}>SignOut</button>
    </Can>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");
    console.log("🚀 ~ file: dashboard.tsx ~ line 27 ~ response", response);

    return {
      props: {},
    };
  }
);
