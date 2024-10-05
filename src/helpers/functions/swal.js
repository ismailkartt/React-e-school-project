import Swal from "sweetalert2";
export const swalAlert = (title, icon= "info", text="") => {
    Swal.fire({
        icon,
        title,
        text,
        confirmButtonText: "Ok"
    });
};

export const swalConfirm = (title,text) => {
    return Swal.fire({
        title,
        text,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
    })
}
