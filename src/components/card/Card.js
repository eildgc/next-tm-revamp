const Card = ({ children, title, description }) => {
  return <div className="p-10 bg-white flex flex-col gap-10 shadow-xl rounded-xl">
    <h1 className="text-4xl lg:text-5xl xl:text-6xl text-slate-600 font-bold text-center py-5">
      {title}
    </h1>
    {children}
  </div>;
};

export default Card;
