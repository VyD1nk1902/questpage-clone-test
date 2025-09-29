import { toast } from "sonner";

export const showSuccessToast = (title: string, description?: string) => {
  return toast.success(title, {
    description,
    duration: 3000,
  });
};

export const showErrorToast = (title: string, description?: string) => {
  return toast.error(title, {
    description,
    duration: 4000,
  });
};

export const showLoadingToast = (title: string, description?: string) => {
  return toast.loading(title, {
    description,
  });
};

export const showInfoToast = (title: string, description?: string) => {
  return toast.info(title, {
    description,
    duration: 3000,
  });
};

export const showWarningToast = (title: string, description?: string) => {
  return toast.warning(title, {
    description,
    duration: 4000,
  });
};
