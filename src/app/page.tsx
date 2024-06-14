import Output from "@/components/home/Output";
import UserInput from "@/components/home/UserInput";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { BioProvider } from "@/context/BioContext";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative grid grid-cols-1 slg:grid-cols-2  lg:grid-cols-2 gap-12 px-4 py-12 sm:py-16 sm:px-8 md:px-10 slg:p-16 lg:p-24">
      <div className="col-span-full group w-full flex flex-col items-center justify-center space-y-2 sm:space-y-4 mb-4 text-center">
        <Link href={"https://github.com/Neeraaaj"} target="_blank" className="mb-4">
          <AnimatedGradientText className="px-6 py-2">
            Star on Github
          </AnimatedGradientText>
        </Link>
        <h1 className="font-extrabold text-4xl md:text-5xl slg:text-7xl lg:text-7xl text-center w-full lg:w-[90%] uppercase mx-auto mt-10 pb-2">
          CRAFT THE PERFECT TWITTER BIO IN SECONDS!
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-accent">Just answer a few questions, and we'll generate a bio that captures who you are.</p>
      </div>
      <BioProvider>
        <UserInput />
        <Output />
      </BioProvider>
    </main>
  );
}
