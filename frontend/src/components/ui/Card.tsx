const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
      {children}
    </div>
  );
};

export default Card;