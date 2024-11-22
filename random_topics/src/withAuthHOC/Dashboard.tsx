import { withAuth } from "./withAuth";

function Dashboard() {
  return <div>Dashboard</div>;
}

export default withAuth(Dashboard);
