import { useEffect, useState } from "react";
import AppTable from "../../components/table/AppTable";
import axiosInstance from "../../api/axionInstance";

const Home = () => {
  const [numbers,setNumbers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/numbers");
      setNumbers(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="flex justify-center min-h-screen items-center ">
      <div className="">
        <AppTable itemData={numbers}></AppTable>
      </div>
    </div>
  );
};

export default Home;
