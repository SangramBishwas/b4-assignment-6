import Lottie from "lottie-react";
import loading from "@/assets/loading.json";

const AMLoading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[70vh]">
      <Lottie className="w-20" animationData={loading} />
    </div>
  );
};

export default AMLoading;
