export default function VerticleDescription({ productImg }) {

    return <>
        <div className="w-full md:w-1/2 mx-auto my-6">
            {/* Mobile View */}
            <div className="md:hidden overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 to-gray-800">
                {productImg.map((img, index) => (
                    <img
                        key={index}
                        src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                        className="w-full object-contain rounded-xl m-2 transition-all duration-300 transform hover:scale-105"
                        alt={`Product Image ${index + 1}`}
                    />
                ))}
            </div>


            {/* Desktop View */}
            <div className="hidden md:flex flex-wrap justify-center space-x-4 overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl">
                {productImg.map((img, index) => (
                    <img
                        key={index}
                        src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                        className="w-64 h-64 object-cover rounded-xl mb-5 transition-all duration-300 transform hover:scale-105"
                        alt={`Product Image ${index + 1}`}
                    />
                ))}
            </div>

        </div>

    </>
}