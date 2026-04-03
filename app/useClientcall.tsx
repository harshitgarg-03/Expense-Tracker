"use client";

import { useCurrentUser } from "@/module/auth/hooks/useCurrentUser";

export const DashboardClient = () => {
    useCurrentUser();
 
  return <></>;
};
