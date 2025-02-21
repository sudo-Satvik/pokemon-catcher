import { Ruler, Weight, Gauge, Bomb, Sparkles, Sun } from "lucide-react";

const Card = ({ img, name, style, exp, atk, abl, hgt, wgt, spd }) => {
  return (
    <div className="w-64 bg-white rounded-md p-3 shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-xl">
      <div className="p-4 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-sm">
        <img src={img} className="w-40 h-40 mx-auto object-contain" />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {name}
        </h2>
        <p className="text-center text-sm font-mediu mb-4 bg-green-200 rounded-full p-2 text-black">
          {style}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-700">
          <div className="flex items-center">
            <Bomb className="w-4 h-4 text-red-500 mr-1" />
            <span>EXP {exp}</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 text-yellow-500 mr-1" />
            <span>{atk} ATK</span>
          </div>
          <div className="flex items-center">
            <Sun className="w-4 h-4 text-blue-500 mr-1" />
            <span>{abl} ABL</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-700 mt-5 gap-2">
          <div className="flex items-center">
            <Ruler className="w-4 h-4 text-green-500 mr-1" />
            <span>{hgt} HGT</span>
          </div>
          <div className="flex items-center">
            <Weight className="w-4 h-4 text-purple-500 mr-1" />
            <span>{wgt} WGT</span>
          </div>
          <div className="flex items-center">
            <Gauge className="w-4 h-4 text-slate-500 mr-1" />
            <span>{spd} SPD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
