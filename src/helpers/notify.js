import { toast } from "react-toastify";

toast.configure();

const alignment = {
  POSITION: toast.POSITION.TOP_RIGHT,
};

export const successNotify = (text) => {
  toast.success(text, alignment);
};

export const warnNotify = (text) => {
  toast.warn(text, alignment);
};

export const errorNotify = (text) => {
  toast.error(text, alignment);
};

export const infoNotify = (text) => {
  toast.info(text, alignment);
};
