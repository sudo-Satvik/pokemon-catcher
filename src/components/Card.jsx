import { Heart, Zap, Shield } from "lucide-react";

const Card = () => {
  return (
    <div className="w-64 bg-white rounded-md p-3 shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-xl">
      <div className="p-4 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-sm">
        <img
          src={"/placeholder.svg"}
          className="w-40 h-40 mx-auto object-contain"
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2"></h2>
        <p className="text-center text-sm font-medium text-gray-600 mb-4"></p>
        <div className="flex justify-between items-center text-sm text-gray-700">
          <div className="flex items-center">
            <Heart className="w-4 h-4 text-red-500 mr-1" />
            <span>HP</span>
          </div>
          <div className="flex items-center">
            <Zap className="w-4 h-4 text-yellow-500 mr-1" />
            <span>ATK</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 text-blue-500 mr-1" />
            <span>DEF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
