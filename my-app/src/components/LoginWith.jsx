// import axios from "axios"
// export default function LoginWith() {


//     const handleLogin = async () => {
//         window.open(`http://localhost:80/auth/google/callback`, '_self')
//     }


//     return <>

//         <button onClick={handleLogin}>Login with google </button>
//     </>
// }




export default function LoginWith() {

    function handleLogin() {
        window.open(`http://localhost:80/auth/google/callback`, "_self")
    }

    return <>
        <button onClick={handleLogin}>Continue with google</button>

    </>
}

