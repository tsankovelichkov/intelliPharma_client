const get = (url) => {

    let myHeaders = new Headers()

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(url, requestOptions)
        .then(response => response.json())
}

const put = (url, body) => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();

    for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
            urlencoded.append(key, body[key]);
        }
    }

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    return fetch(url, requestOptions)
        .then(response => response.text())
}

export default {
    get,
    put
}