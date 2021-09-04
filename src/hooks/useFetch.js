import { useEffect, useState } from "react";



export const useFetch = () => {

    const [state, setState] = useState(null);

    useEffect(() => {

        fetch(`https://assets.breatheco.de/apis/sound/songs`)
            .then( response =>{
                return response.json();
            })
            .then( data => {
                setState(data);
            })
    }, [])

    return state;
}
