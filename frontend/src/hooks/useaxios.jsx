import axios from "axios";

const baseUrl = "http://127.0.0.1:5000";

const useaxios = () => {
  return async function ({
    method = "GET",
    url = "",
    body = "",
    headers = {},
  }) {
    try {
      let res = await axios({
        method,
        url: `${baseUrl}/${url}`,
        headers: { "Content-Type": "application/json", ...headers },
        data: body,
      });

      return res.data;
    } catch (e) {
      return "error";
    }
  };
};

export default useaxios;
