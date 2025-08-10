import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import RecentlyPlayed from "../components/RecentlyPlayed";

const drawerWidth = 240;

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar / Top Nav */}
      <AppBar
        sx={{
          zIndex: 1100,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Backlog
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer / Side Nav */}
      <Drawer
        variant="permanent"
        sx={{
          zIndex: 1200,
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Dashboard", "Backlog", "Achievements"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index === 0 && <HomeIcon />} 
                      {index === 1 && <SportsEsportsIcon />}
                      {index === 2 && <EmojiEventsIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List>
            {["Settings"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <SettingsIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {/* Welcome Back message */}
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Welcome Back, @hypraktiv!
        </Typography>

        {/* Recently Played on Steam section */}
        <RecentlyPlayed />

        {/* Recently Played on Xbox section */}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Recently Played on Xbox
        </Typography>
      </Box>
    </Box>
  );
};