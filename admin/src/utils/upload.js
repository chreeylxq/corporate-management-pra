import axios from 'axios';

function upload(pathName, userForm) {
    let formData = new FormData();
    for (let i in userForm) {
        formData.append(i, userForm[i]);
    }
    return axios.post(pathName, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    }).then(res => res.data)
}

export default upload;