import Swal from "sweetalert2";

/**
 * Displays confirmation popup for removing an item.
 *
 * @param {Object} params - The parameters for the alert popup.
 * @param {Function} params.preConfirm - (required) A callback function executed before confirming the alert.
 * @param {string} params.title - The title displayed in the alert popup.
 * @param {string} params.confirmText - The text displayed on the confirm button.
 * @param {boolean} [params.allowEscapeKey=true] - Whether to allow the escape key to close the popup.
 * @param {boolean} [params.allowOutsideClick=true] - Whether to allow clicking outside the popup to close it.
 * @param {boolean} [params.showCancelButton=true] - Whether to show the cancel button in the popup.
 * @param {boolean} [params.showCloseButton=true] - Whether to show the close button in the popup.
 *
 * @example
 * deleteAlertPopup({
 *   name: 'User',
 *   title: 'Are you sure?',
 *   confirmText: 'Yes',
 *   preConfirm: handleRemove,
 *   allowEscapeKey: true,
 *   allowOutsideClick: true,
 *   showCancelButton: true
 * });
 */
export default function infoAlertPopup({
  preConfirm,
  title,
  confirmText,
  allowEscapeKey = true,
  allowOutsideClick = true,
  showCancelButton = true,
  showCloseButton = false,
}) {
  return Swal.fire({
    icon: "info",
    title,
    showCancelButton,
    showCloseButton,
    confirmButtonText: confirmText || "Yes",
    cancelButtonText: "Cancel",
    customClass: {
      title: "text-lg font-semibold-sans",
      confirmButton: "bg-blue-500 hover:bg-blue-700 !outline-none",
      cancelButton:
        "bg-gray-200 hover:bg-gray-500 text-black hover:text-white !outline-none",
      closeButton: "hover:text-gray-600 text-gray-500 !outline-none",
    },
    showLoaderOnConfirm: true,
    allowOutsideClick,
    allowEscapeKey,
    preConfirm,
  });
}
