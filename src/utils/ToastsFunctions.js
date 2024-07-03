import { toast } from "react-toastify";

const config = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export let toastSuccess = (txt) => toast.success(txt, config);
export let toastError = (txt) => toast.error(txt, config);
export let toastInfo = (txt) => toast.info(txt, config);

export const showLoadingToast = (txt) => {
  const toastId = toast.loading(txt, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return toastId; // Return the toast ID for potential clearing later
};

export const updateSuccess = (toastID, txt) => {
  toast.update(toastID, {
    isLoading: false,
    type: "success",
    render: txt,
    autoClose: 1000,
    hideProgressBar: true,
  });
};
export const updateError = (toastID, txt) => {
  toast.update(toastID, {
    isLoading: false,
    type: "error",
    render: txt,
    autoClose: 1000,
    hideProgressBar: true,
  });
};
export const updateInfo = (toastID, txt) => {
  toast.update(toastID, {
    isLoading: false,
    type: "info",
    render: txt,
    autoClose: 1000,
    hideProgressBar: true,
  });
};
