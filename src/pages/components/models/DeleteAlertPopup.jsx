import Swal from "sweetalert2"
/**
 * Displays confirmation popup for removing an item.
 *
 * @param {Object} params - The parameters for the alert popup.
 * @param {Function} params.preConfirm - (required) A callback function executed before confirming the alert.
 * @param {string} params.title - The title displayed in the alert popup.
 * @param {string} params.confirmText - The text displayed on the confirm button.
 * @param {string} params.confirmButtonColor - The text displayed on the confirm button.
 * @param {string} params.name - The name of the item to be removed (used in the alert body).
 *
 * @example
 * deleteAlertPopup({
 *   name: 'User',
 *   title: 'Are you sure?',
 *   confirmText: 'Yes, delete it!',
 *   confirmButtonColor: 'classNameForButton',
 *   preConfirm: handleRemove,
 * });
 */
export default function deleteAlertPopup({ preConfirm, title, confirmText, name, confirmButtonColor }) {
    return Swal.fire({
        icon: "question",
        title: title || `Are you sure you want to delete ${name || ""}?`,
        showCancelButton: true,
        confirmButtonText: confirmText || "Delete",
        cancelButtonText: "Cancel",
        customClass: {
            title: "text-lg",
            confirmButton: `${confirmButtonColor || "bg-red-500 hover:bg-red-600"} !outline-none`,
            cancelButton: "bg-gray-200 hover:bg-gray-500 text-black hover:text-white !outline-none"
        },
        showLoaderOnConfirm: true,
        preConfirm
    })
}