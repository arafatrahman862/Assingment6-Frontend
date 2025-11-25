import type { ComponentType } from "react";




export interface ILogin {
  email: string;
  password: string;
}

export interface ISidebarItems {
  title: string,
  items: {
    title: string,
    url: string,
    component: ComponentType
  }[]
}

export type TRole = "DRIVER" | "ADMIN" |"RIDER"