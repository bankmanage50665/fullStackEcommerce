import img from "../../assets/home.webp"


export default function Home() {
    return <>
        <div className="h-screen w-full">
            <img src={img} className="object-cover h-full w-full" />
        </div>

    </>
}