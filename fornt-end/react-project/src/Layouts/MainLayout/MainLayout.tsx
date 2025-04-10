import LogoutIcon from "@mui/icons-material/Logout";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const MainLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const logout = (event: any): void => {
    event.preventDefault();
    localStorage.removeItem("authToken");
    navigate("/auth");
  };
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setUserName(localStorage.getItem("authToken") || "");
    }
  }, []);
  return (
    <>
      <div className="bg-white shadow flex p-2 px-4">
        <div className="w-full">
          <div className="float-left">
            <h1 className="text-2xl capitalize font-medium">Hello, {userName} </h1>
          </div>
          <div className="float-right">
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="bg-red-500 text-md cursor-pointer select-none text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </div>
      <div>{children}</div>

      <Dialog
        keepMounted
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "500px",
            height: "30vh",
            borderRadius: "10px",
          },
        }}
        aria-describedby="alert-dialog-slide-description"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div>
          <DialogTitle>Logout</DialogTitle>
          <hr className=" border-gray-300  " />
        </div>
        <DialogContent className="flex flex-col">
          <p className="capitalize mt-0 p-0">
            Are you sure you want to logout?
          </p>
        </DialogContent>
        <div>
          <hr className=" border-gray-300 " />
          <DialogActions>
            <hr className=" border-gray-300 " />
            <button
              className="border-2 border-blue-500 text-md cursor-pointer select-none text-blue-500 py-2 px-4 rounded-md hover:opacity-70"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-md cursor-pointer select-none text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default MainLayout;
