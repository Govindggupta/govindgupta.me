import Image from "next/image";
import mainLogo from "@/logos/white_thick_border.svg";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6">
      <h1>Govind</h1>
      <Image src={mainLogo} alt="Govind logo" priority />
    </div>
  );
}
