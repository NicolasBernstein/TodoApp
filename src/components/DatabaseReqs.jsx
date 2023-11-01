import axios from 'axios';
const page = 'http://localhost/todoapp';
export function Log(Username, Password) {


    return axios.get(page, {
        params: {
            "datatype": 'login',
            "username": Username,
            "password": Password
        },
        withCredentials: true
    })
        .then(response => {
            var data = response.data;
            console.log(data);
            if (data !== "Wrong password" && data != "Wrong username") {
                CheckSession();
                return "successful login";
            } else {
                return data;
            }
        })
}

export function Signup(Username, Password) {
    return axios({
        method: 'post',
        url: page,
        data: new URLSearchParams({ "datatype": 'register', "username": Username, "password": Password }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
    })
        .then(response => {
            var data = response.data;
            console.log(data);
            Log(Username, Password);
            return data;
        })

}

export function CheckSession() {
    return axios.get(page, {
        params: {
            "datatype": 'checksession',
        },
        withCredentials: true
    })
        .then(response => {
            var data = response.data;
            return data;
        })
}
export function Logout() {
    return axios.get(page, {
        params: {
            "datatype": 'logout',
        },
        withCredentials: true
    })
        .then(response => {
            var data = response.data;
            console.log(data);
            window.location.reload();
            return data;
        })
}

export function ReadData() {
    return axios.get(page, {
        params: {
            "datatype": 'gettodos',
        },
        withCredentials: true
    })
        .then(response => {
            var data = response.data;
            console.log(data);
            return data;
        })
}

export function Createtodo(title, description, category) {

    return axios({
        method: 'post',
        url: page,
        data: new URLSearchParams({ "datatype": 'create', "title": title, "description": description, "category": category }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
    })
        .then(response => {
            var data = response.data;
            console.log(data);
            return data;
        })

}

export function Deletetodo(id) {


    return axios.post(`${page}`, {
        params: {
            "id": id
        },
        withCredentials: true
    })
        .then(response => {
            var data = response.data;
            return data;
        })


    /* for deployment on 000webhost
    return axios({
    method: 'post',
    url: page,
    data: new URLSearchParams({ "datatype": 'DELETE', "id": id }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true
})
    .then(response => {
        var data = response.data;
        console.log(data);
        return data;
    })*/
}

export function Updatetodo(list) {

    return axios.put(`${page}`, {
        "id": list.id,
        "title": list.title,
        "description": list.description,
        "category": list.category,
        "done": list.done,


    }, { withCredentials: true })
        .then(response => {
            var data = response.data;
            return data;
        })

    /* for deployment on 000webhost
        return axios({
        method: 'post',
        url: page,
        data: new URLSearchParams({
            "datatype": 'PUT', "id": list.id,
            "title": list.title,
            "description": list.description,
            "category": list.category,
            "done": list.done,
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
    })
        .then(response => {
            var data = response.data;
            console.log(data);
            return data;
        })
        */


}