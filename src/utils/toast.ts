import toast from "react-hot-toast";

const notify = (message: string, type?: string) => {
  if (type == "success") {
    toast.success(message, {
      style: {
        fontSize: "12px",
      },
    });
  } else if (type == "error") {
    toast.error(message, {
      style: {
        fontSize: "12px",
      },
    });
  } else {
    toast(message, {
      style: {
        fontSize: "12px",
      },
    });
  }
};

export default notify;
