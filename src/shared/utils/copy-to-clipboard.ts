import toast, { ToastOptions } from 'react-hot-toast';

interface Props {
  text: string;
  message?: string;
  options?: ToastOptions;
}

export const copyToClipboard = ({
  text,
  message = 'Copied to clipboard!',
  options,
}: Props) => {
  if (!navigator.clipboard) {
    return;
  }

  navigator.clipboard.writeText(text);
  toast.success(message, options);
};
