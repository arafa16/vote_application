import Toastify from "toastify-js";

export function NewNotification(message: any) {
  Toastify({
    text: `${message}`,
    duration: 3000,
    gravity: "top",
    position: "right",
    close: true,
    stopOnFocus: true,
    style: {
      background: "#fff",
      color: "#3d4044", // slate-500
      fontSize: "12px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(34,197,94,0.10)",
      padding: "20px 64px 20px 20px",
      border: "1px solid #e5e7eb",
    },
  }).showToast();
}
