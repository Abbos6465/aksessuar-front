import { getAccessToken } from "@/utils/auth";
export const state = {
  access_token: getAccessToken(),
  user: null,
  role: null,
  errors:null,
  isLoading:false,
  errorPage:null,
};
