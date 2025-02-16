import { redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
const DashBoard = () => {
  const { uid } = useParams();
  return uid ? <h1>I am from dashboard,{uid}</h1> : <h1>Undefined</h1>;
};
export default DashBoard;

export const loader = ({ params }) => {
  const { uid: UserId } = params;
  if (UserId === "undefined") {
    return redirect("/login");
  }
  return null;
};
