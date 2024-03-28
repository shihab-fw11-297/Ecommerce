import toast from "react-hot-toast";

export const responseToast = (
    res,
    navigate,
    url
  ) => {
    if ("data" in res) {
      toast.success(res.data.message);
      if (navigate) navigate(url);
    } else {
      const error = res.error;
      const messageResponse = error.data;
      toast.error(messageResponse.message);
    }
  };