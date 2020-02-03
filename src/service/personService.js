const baseURL = 'https://reqres.in/api/users'

export async function users(){
    const result = await fetch(baseURL, {method: 'GET'})
        .then((response) => {
            return response.json()
        })
        .catch((error) => console.log(error))
        return result
}

export async function createUser(){
    return await fetch(baseURL, {
        method: 'POST', 
        headers: {
            Accept: 'application/json', "Content-Type" : 'application/json'
        }
    })
    .then( async (response) =>{
        if (response.status === 200) {
            alert(response.message);
        }
    })
    .catch(err => console.log(err))
}