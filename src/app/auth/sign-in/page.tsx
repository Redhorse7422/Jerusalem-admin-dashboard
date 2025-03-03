import Signin from "@/components/Auth/Signin";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignIn() {
  return (
    // Full screen container with flex centering
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-5xl">

        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card overflow-hidden">
          <div className="flex flex-wrap">
            {/* Left side: Sign in form */}
            <div className="w-full xl:w-1/2">
              <div className="p-4 sm:p-12.5 xl:p-15">
                <Signin />
              </div>
            </div>

            {/* Right side: Image, shown only on xl and up */}
            <div className="hidden xl:block xl:w-1/2">
              <div className="custom-gradient-1 overflow-hidden  px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
                <Link className="mb-10 inline-block" href="/">
                  <Image
                    className="hidden dark:block"
                    src={"/images/logo/logo.svg"}
                    alt="Logo"
                    width={176}
                    height={32}
                  />
                  <Image
                    className="dark:hidden"
                    src={"/images/logo/logo-dark.svg"}
                    alt="Logo"
                    width={176}
                    height={32}
                  />
                </Link>
                <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                  Sign in to your account
                </p>

                <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                  Welcome Back!
                </h1>

                <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                  Please sign in to your account by completing the necessary
                  fields below
                </p>

                <div className="mt-31">
                  <Image
                    src={"/images/grids/grid-02.svg"}
                    alt="Logo"
                    width={405}
                    height={325}
                    className="mx-auto dark:opacity-30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
