import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { SlMenu } from "react-icons/sl";//ham
import { RxCross1 } from "react-icons/rx";//cross
import { FiUser } from "react-icons/fi";//user
import { IoExitOutline } from "react-icons/io5";//logout
import { LuLayoutDashboard } from "react-icons/lu";//dashboard
import { BsBox2 } from "react-icons/bs";//box
import { LiaShippingFastSolid } from "react-icons/lia";//order
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#124",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    borderRight: "none",        
    top: 64,          
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DashBoardBar = () => {
   

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const {logout}=useContext(AuthContext)
 

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
{/* Navbar */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <button
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            {!open&& <p className="p-2 cursor-pointer rounded-full cursor pointer hover:bg-amber-700 hover:scale-105 transition-all ease-in-out"><SlMenu/></p>}
          </button>
          <div className="flex justify-between w-full items-center">
          <Typography variant="h6" noWrap component="div">
            <h1 className="text-[min(3vw,200px)] font-extrabold tracking-wide mx-5 ">CLOTHIFY</h1>
          </Typography>
          <Link title='log out' to={'/login'}><button onClick={logout} className="p-2 cursor-pointer  rounded-full cursor pointer hover:bg-amber-700 hover:scale-105 transition-all ease-in-out"><IoExitOutline size={16} /></button></Link>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer variant="permanent" open={open} className="">
        <DrawerHeader>
          <button className="" onClick={handleDrawerClose}>
            {theme.direction === "rtl" ?<p>d</p>: <p className="p-2 rounded-full cursor-pointer  cursor pointer hover:bg-gray-300 hover:scale-105 transition-all ease-in-out"><RxCross1/></p>}
          </button>
        </DrawerHeader>
        <Divider />
        <List className=" ">
           <div className=" ">
            <ul className="text-center top-0 pt-0 mt-0 ">
              {/* <Link to={'/dashboard'}><li className="p-3 px-6 hover:bg-gray-200 transition-all ease-in-out duration-150 text-center"><p className="text-center">{open?<p className="flex justify-between items-center gap-2">DASHBOARD<LuLayoutDashboard/></p>:<LuLayoutDashboard/>}</p></li></Link> */}
              <NavLink to={'/admin'}><li className="p-3 px-6 hover:bg-gray-200 transition-all ease-in-out duration-150 text-center"><p className="text-center">{open?<p className="flex justify-between items-center gap-2">DASHBOARD<LuLayoutDashboard/></p>:<LuLayoutDashboard/>}</p></li></NavLink>


              <Link to={"userPage"}><li className=" p-3 px-6 hover:bg-gray-200 transition-all ease-in-out duration-150 text-center"><p className="text-center">{open?<p className="flex justify-between items-center gap-2">USER DETAILS<FiUser/></p>:<FiUser/>}</p></li></Link>
              <Link to={"Products"}><li className=" p-3 px-6 hover:bg-gray-200 transition-all ease-in-out duration-150 text-center"><p className="text-center">{open?<p className="flex justify-between items-center gap-2">PRODUCTS<BsBox2 size={19}/></p>:<BsBox2 size={19}/>}</p></li></Link>
              <Link to={"orders"}><li className=" p-3 px-6 hover:bg-gray-200 transition-all ease-in-out duration-150 text-center"><p className="text-center">{open?<p className="flex justify-between items-center gap-2">ORDERS<LiaShippingFastSolid size={19}/></p>:<LiaShippingFastSolid size={19}/>}</p></li></Link>

            </ul>
            </div>
            
        </List>
      </Drawer>

    </Box>
  );
}

export default DashBoardBar