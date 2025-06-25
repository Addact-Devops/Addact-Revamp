import { RightArrowIcon } from "../atom/icons";

const CtaBanner = () => {
  return (
    <section>
      <div className="bg-[url(/ctabg.png)]  text-white bg-center bg-cover bg-no-repeat w-full h-full shadow-md">
        <div className="container">
          <div className="py-24">
            <h2 className="!text-[28px] md:!text-5xl xl:!text-6xl w-[312px] md:w-[412px] lg:w-[517px] leading-[85px]">
              Get started with us today!
            </h2>
            <button className="mt-12 bg-white text-[#3C4CFF] text-lg px-5 py-4 rounded hover:bg-gray-200 flex items-center gap-5 font-semibold">
              Read more
              <RightArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
