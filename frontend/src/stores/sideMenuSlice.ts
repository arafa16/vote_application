import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
  privilege?: string;
}

export interface SideMenuState {
  menu: Array<Menu | string>;
}

const initialState: SideMenuState = {
  menu: [
    "START MENU",
    {
      icon: "FileText",
      title: "Tata Cara Voting",
      pathname: "/",
      privilege: "tata_cara_voting",
    },
    {
      icon: "Users",
      title: "Profile Kandidat Pengawas",
      pathname: "/commissioner_profile",
      privilege: "profile_kandidat_pengawas",
    },
    {
      icon: "Users",
      title: "Profile Kandidat Pengurus",
      pathname: "/director_profile",
      privilege: "profile_kandidat_pengurus",
    },
    {
      icon: "Edit",
      title: "Mulai Voting",
      pathname: "/commissioner_candidate",
      privilege: "mulai_voting",
    },
    {
      icon: "CheckCircle",
      title: "Riwayat Voting",
      pathname: "/history_vote",
      privilege: "riwayat_voting",
    },
    {
      icon: "Monitor",
      title: "Dashboard",
      pathname: "/dashboard",
      privilege: "dashboard",
    },
    {
      icon: "Clipboard",
      title: "Status Voting Anggota",
      pathname: "/vote_data",
      privilege: "status_voting_anggota",
    },
    {
      icon: "Users",
      title: "Data User",
      pathname: "/users",
      privilege: "user_data",
    },
    {
      icon: "Settings",
      title: "Setting",
      privilege: "setting",
      subMenu: [
        {
          icon: "Settings",
          title: "application",
          pathname: "/application",
          privilege: "setting",
        },
        {
          icon: "Settings",
          title: "voting period",
          pathname: "/voting_period",
          privilege: "setting",
        },
        {
          icon: "Settings",
          title: "commissioner candidate",
          pathname: "/commissioner_candidate_setup",
          privilege: "setting",
        },
        {
          icon: "Settings",
          title: "director candidate",
          pathname: "/director_candidate_setup",
          privilege: "setting",
        },
        {
          icon: "Settings",
          title: "slider",
          pathname: "/slider",
          privilege: "setting",
        },
        {
          icon: "Settings",
          title: "company",
          pathname: "/company",
          privilege: "setting",
        },
        {
          icon: "Settings",
          title: "status",
          pathname: "/status",
          privilege: "setting",
        },
        {
          icon: "Settings",
          title: "audit log",
          pathname: "/audit_log",
          privilege: "setting",
        },
      ],
    },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
