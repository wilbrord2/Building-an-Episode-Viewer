import { Icon } from "@iconify/react";

const List =['Season', 'Episode']
function MovieList() {
  return (
    <div className="flex flex-col gap-4 py-8 px-4 text-gray-300">
      {/* filters */}
      <div className="w-full flex items-center justify-between gap-4">
        <span className="flex items-center border border-gray-800 hover:border-gray-600 hover:duration-500 rounded-lg w-1/2 overflow-hidden">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search by episode name"
            className="pl-4 outline-none flex-1"
          />
          <span className="bg-slate-700 p-3 cursor-pointer">
            <Icon
              icon="iconamoon:search-bold"
              width="24"
              height="24"
              className=""
            />
          </span>
        </span>

        <div className=" flex gap-8 ">
          {List.map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-1 cursor-pointer hover:text-gray-300 hover:duration-500 text-gray-500"
            >
              {item}
              <Icon icon="eva:arrow-down-fill" width="24" height="24" />
            </span>
          ))}
        </div>
      </div>

      {/* movie list */}
      <div></div>
      {/* pagination */}
    </div>
  );
}

export default MovieList;
