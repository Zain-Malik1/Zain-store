type ToastProps = {
  message: string;
};

export default function Toast({
  message,
}: ToastProps) {
  return (
    <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-lg bg-red-500 px-5 py-3 text-center text-white shadow-lg sm:right-5 sm:top-5 sm:text-left">
      {message}
    </div>
  );
}
