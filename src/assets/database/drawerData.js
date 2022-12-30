import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "../../styles";

const topLinks = [
  {
    text: "Dashboard",
    route: "Home",
    icon: <AntDesign name="home" size={24} color={Colors.primary.light} />,
  },
  {
    text: "My Profile",
    route: "profile",
    icon: (
      <MaterialCommunityIcons
        name="face-profile"
        size={24}
        color={Colors.primary.light}
      />
    ),
  },
  {
    text: "Refer a  Friend",
    route: "refer",
    icon: (
      <MaterialCommunityIcons
        name="transit-connection-variant"
        size={24}
        color={Colors.primary.light}
      />
    ),
  },
  {
    text: "Share & Rate",
    route: "refer",
    icon: <AntDesign name="sharealt" size={24} color={Colors.primary.light} />,
  },
  {
    text: "Support",
    route: "support",
    icon: (
      <MaterialIcons
        name="support-agent"
        size={24}
        color={Colors.primary.light}
      />
    ),
  },
  {
    text: "Change Password",
    route: "ChangePassword",
    icon: (
      <MaterialCommunityIcons
        name="form-textbox-password"
        size={24}
        color={Colors.primary.light}
      />
    ),
  },
];

const bottomLinks = [
  {
    text: "Logout",
    route: "Logout",
    icon: (
      <MaterialCommunityIcons
        name="logout-variant"
        size={24}
        color={Colors.primary.light}
      />
    ),
  },
];

export default { topLinks, bottomLinks };
