import { toast } from "react-toastify";

const config = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export let toastSuccess = (txt, extraConfig = {}) =>
  toast.success(txt, { ...config, ...extraConfig });
export let toastError = (txt, extraConfig = {}) =>
  toast.error(txt, { ...config, ...extraConfig });
export let toastInfo = (txt, extraConfig = {}) =>
  toast.info(txt, { ...config, ...extraConfig });

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
