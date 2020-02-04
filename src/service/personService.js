const baseURL = 'https://reqres.in/api/users'

export async function users(){
    try {
        const result = await fetch(baseURL, { method: 'GET'});

        return await result.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function createUser(user){
    return await fetch(baseURL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
    .then( async (response) =>{
        if (response.status === 200) {
            alert(response.message);
        }
    })
    .catch(err => console.log(err))
}