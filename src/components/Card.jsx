import { Ruler, Weight, Gauge, Bomb, Sparkles, Sun } from "lucide-react";

const Card = () => {
  return (
    <div className="w-64 bg-white rounded-md p-3 shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-xl">
      <div className="p-4 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-sm">
        <img
          src={
            "https://images.pexels.com/photos/7420656/pexels-photo-7420656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          className="w-40 h-40 mx-auto object-contain"
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Pokemon Name
        </h2>
        <p className="text-center text-sm font-mediu mb-4 bg-green-200 rounded-full p-2 text-black">
          Pokemon style
        </p>
        <div className="flex justify-between items-center text-sm text-gray-700">
          <div className="flex items-center">
            <Bomb className="w-4 h-4 text-red-500 mr-1" />
            <span>EXP</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 text-yellow-500 mr-1" />
            <span>ATK</span>
          </div>
          <div className="flex items-center">
            <Sun className="w-4 h-4 text-blue-500 mr-1" />
            <span>Ability</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-700 mt-5 gap-2">
          <div className="flex items-center">
            <Ruler className="w-4 h-4 text-green-500 mr-1" />
            <span>Height</span>
          </div>
          <div className="flex items-center">
            <Weight className="w-4 h-4 text-purple-500 mr-1" />
            <span>Weight</span>
          </div>
          <div className="flex items-center">
            <Gauge className="w-4 h-4 text-slate-500 mr-1" />
            <span>Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
