import { useRef } from "react";
import { json } from "react-router-dom";

export default function useHttpHooks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const avtiveHttpRequest = useRef([]);

  async function sendRequest(url, method = "GET", body = null, headers = {}) {
    setLoading(true);
    const abortController = new AbortController();
    try {
      const res = await fetch(url, {
        method,
        body,
        headers,
        signal: abortController.signal,
      });
      const resData = await res.json();
      if (!res.ok) {
        throw json(
          {
            message:
              resData.message ||
              "Couldn't get correct response from backend, Please try again later.",
          },
          { status: 500 }
        );
      }
      setLoading(false);
      return resData;
    } catch (err) {
      setError(err);
      setLoading(false);
      //   throw json(
      //     { message: "Field to create/login user, try again later." },
      //     { status: 500 }
      //   );
    }
  }

  const clearErr = () => {
    setError(null);
  };

  return {
    sendRequest,
    error,
    loading,
    clearErr,
  };
}
