import Image from "next/image";
import circle from "../../assets/Spinner.svg";
const LottieControl = () => {
  return (
    <div className="flex flex-col h-[60vh] items-center justify-center">
      <Image
        src={circle}
        className="animate-spin"
        alt="loader"
        width={100}
        height={100}
      />
    </div>
  );
};

export default LottieControl;
