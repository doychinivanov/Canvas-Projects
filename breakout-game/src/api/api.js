export const settings = {
    host: ''
}

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function getOptions(method = 'get', body){
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'f7RPXl3ISPMso59E0WHMiepXlzaw4vtOpalboKIi',
            'X-Parse-REST-API-Key': 'txGAhsu2APcJVJovMEPoeYszg3uowjhXdzsv9Adt'
        }
    };

    if(body){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body)
    }

    return options;
}

export async function get(url){
    return await request(url, getOptions())
}

export async function post(url, data){
    return await request(url, getOptions('post', data));
}