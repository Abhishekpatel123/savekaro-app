import person from "../icons/person.png";
import refer from "../icons/refer.png";
import share from "../icons/share.png";
import help from "../icons/help.png";
import support from "../icons/support.png";
import password from "../icons/password.png";
import house from "../icons/house.png";

import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "../src/styles";

const data = [
  {
    // icon: house,
    text: "Home",
    route: "Home",
    icon: <AntDesign name="home" size={24} color={Colors.primary.light} />,
  },
  {
    // icon: person,
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
    // icon: refer,
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
    // icon: share,
    text: "Share & Rate",
    route: "refer",
    icon: <AntDesign name="sharealt" size={24} color={Colors.primary.light} />,
  },
  {
    // icon: support,
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
    // icon: password,
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

export default data;
