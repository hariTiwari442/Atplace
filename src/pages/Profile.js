import { redirect } from "react-router-dom";

const Profile = () => {
  return <h1>I am from profile page</h1>;
};
export default Profile;

export const loader = ({ params }) => {
  const { uid } = params;
  if (uid === "undefined") {
    return redirect("/login");
  }
  return null;
};
