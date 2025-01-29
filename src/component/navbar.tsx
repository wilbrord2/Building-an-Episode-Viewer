
function Navbar() {
  return (
    <nav className="sticky p-6 shadow-md">
      <div className="flex items-baseline justify-between">
        <div className="">
          <h1 className="text-xl md:text-4xl lg:text-6xl font-bold text-gray-400 ">
            R&M <span className="italic text-xl">Episodes</span>
          </h1>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
