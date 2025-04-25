import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/types";
import Link from "next/link";

const MyAddress = ({ isUser }: { isUser: IUser | null }) => {
  return (
    <>
      <div className="font-madimi">
        <Card className="w-full border-none shadow-none p-0 m-0">
          <CardHeader className="border-b pb-5">
            <CardTitle className="text-lg font-semibold text-gray-800 flex justify-between">
              Information
              <Link href="/dashboard/my-account/update">
                <Button
                  size={"sm"}
                  variant="outline"
                  className="border-black hover:cursor-pointer text-black"
                >
                  Update
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-0 md:flex justify-between ">
            <div>
              <p className="text-sm font-semibold text-gray-500">Address</p>
              <p className="text-base">
                {isUser?.city === "N/A" ||
                isUser?.state === "N/A" ||
                isUser?.postalCode === "N/A"
                  ? "N/A"
                  : `${isUser?.city}, ${isUser?.state}, ${isUser?.postalCode}`}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">Gender</p>
              <p className="text-base">{isUser?.gender || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Phone Number
              </p>
              <p className="text-base">{isUser?.phoneNo || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Date of Birth
              </p>
              <p className="text-base">
                {isUser?.dateOfBirth && isUser?.dateOfBirth !== "N/A"
                  ? new Date(isUser.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MyAddress;
