import { FaCircleCheck } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { RiErrorWarningFill, RiLoader3Fill } from "react-icons/ri";
import { MdError } from "react-icons/md";

export const icons = {
  success: <FaCircleCheck className="text-lg" />,
  info: <IoMdInformationCircle className="text-lg" />,
  warning: <RiErrorWarningFill className="text-lg" />,
  error: <MdError className="text-lg" />,
  loading: <RiLoader3Fill className="text-lg animate-spin" />,
};
