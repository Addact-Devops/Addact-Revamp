import Image from "next/image";

const Loader = () => {
    return (
        <div className='flex items-center justify-center h-screen w-full'>
            <Image src='/loader.gif' alt='Loading...' width={100} height={100} />
        </div>
    );
};

export default Loader;
