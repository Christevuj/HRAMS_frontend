import HeadHeader from "@/components/layouts/headHeader";
import { Outlet } from "react-router-dom";

const HeadLayout = () => {
  return (
    <div>
      <HeadHeader />
      <Outlet />
    </div>
  );
};

export default HeadLayout;
