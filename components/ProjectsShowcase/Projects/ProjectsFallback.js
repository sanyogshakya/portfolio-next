export const ProjectsFallback = () => {
  const countArr = [1, 2, 3];
  return (
    <>
      {countArr.map((count) => (
        <div
          key={count}
          className="flex flex-col sm:flex-row lg:flex-col xl:flex-row hover:bg-accent-100/5 p-3 sm:p-4 rounded -ml-3 -mr-3 sm:-ml-4 sm:-mr-4 mb-4  animate-pulse"
        >
          <div className="shadow-xl md:w-1/2 lg:w-full xl:w-2/5 h-[100%] p-1 rounded-md backdrop-blur-sm bg-accent-200/10 mb-4 xl:mt-1">
            <div className={`w-full aspect-video overflow-hidden rounded`} />
          </div>
          <div className="project-text md:w-1/2 lg:w-full xl:w-3/5 sm:pl-4 lg:pl-0 xl:pl-4">
            {/* Title */}
            <div className="inline-block mb-2 w-1/2 h-[24px] xl:mt-1 bg-black-400" />
            {/* Desc */}

            <div className={`mb-3 w-full`}>
              {[1, 2].map((count) => (
                <div
                  className="w-full h-[18px] bg-black-300 mb-[0.5625rem]"
                  key={count}
                />
              ))}
              <div className="w-1/3 h-[18px] bg-black-300" key={count} />
            </div>
            {/* Tools */}
            <div className="flex flex-wrap -m-2 w-9/10">
              {[1, 2, 3, 4, 5].map((count) => (
                <div key={count} className="p-2 w-1/4 h-[40px]">
                  <div className="px-3 py-1 bg-accent-200/10 rounded-md text-accent-200 text-xs font-semibold h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
