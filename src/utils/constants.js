const SERVER_IP = "192.168.1.9:8000";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api`,
  API_ROUTES: {
    REGISTER: "auth/register",
  },
};
