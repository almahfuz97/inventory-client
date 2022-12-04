import { useEffect, useState } from "react"

const useToken = email => {
    const [token, setToken] = useState();
    console.log(token, email)
    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_url}/jwt`, {
                headers: {
                    email: email
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.token) {

                        localStorage.setItem('inventory-token', data.token)
                        setToken(data.token)

                    }
                })
                .catch(err => console.log(err))
        }
    }, [email])
    return [token];
}

export default useToken;