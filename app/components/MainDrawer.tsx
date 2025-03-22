import ListItemButton from "@mui/joy/ListItemButton";
import { Drawer, List, ListItem } from "@mui/material";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalculateIcon from "@mui/icons-material/Calculate";
import LogoutIcon from "@mui/icons-material/Logout";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import { ListItemContent, ListItemDecorator } from "@mui/joy";
export default function MainDrawer({
  drawerOpen,
  setDrawerOpen,
}: {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const menuList = [
    { id: 1, title: "Qazo counter", icon: <CalculateIcon /> },
    { id: 2, title: "Daily zirk", icon: <ScatterPlotIcon /> },
    { id: 3, title: "Statistics", icon: <BarChartIcon /> },
    { id: 4, title: "Prayer Time setting", icon: <SettingsIcon /> },
    { id: 5, title: "Change location", icon: <EditLocationIcon /> },
    { id: 6, title: "Logout", icon: <LogoutIcon /> },
  ];
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <p className="drawer-title">Kim John</p>
      <List className="drawer-list">
        {menuList.map((ele) => {
          return (
            <ListItem className="drawer-listItem" key={ele.id}>
              <ListItemButton variant="plain">
                <ListItemDecorator sx={{ marginRight: "10px" }}>
                  {ele.icon}
                </ListItemDecorator>
                <ListItemContent>{ele.title}</ListItemContent>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
