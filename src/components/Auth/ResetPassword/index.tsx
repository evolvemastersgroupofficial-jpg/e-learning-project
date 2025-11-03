"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Common/Loader";
import Link from "next/link";
import Image from "next/image";
import { getImagePrefix } from "@/utils/util";

const ResetPassword = ({ token }: { token: string }) => {
  const [data, setData] = useState({
    newPassword: "",
    ReNewPassword: "",
  });
  const [loader, setLoader] = useState(false);

  const [user, setUser] = useState({
    email: "",
  });

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post(`/api/forgot-password/verify-token`, {
          token,
        });

        if (res.status === 200) {
          setUser({
            email: res.data.email,
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data);
        // ✅ FIX: use string path to avoid typedRoutes error
        router.push("/forgot-password" as any);
      }
    };

    verifyToken();
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    if (data.newPassword === "") {
      toast.error("Please enter your password.");
      return;
    }

    try {
      const res = await axios.post(`/api/forgot-password/update`, {
        email: user?.email,
        password: data.newPassword,
      });

      if (res.status === 200) {
        toast.success(res.data);
        setData({ newPassword: "", ReNewPassword: "" });

        // ✅ FIX: use safe redirect
        router.push("/signin" as any);
      }
    } catch (error: any) {
      toast.error(error?.response?.data);
    }

    setLoader(false);
  };

  return (
    <section className="bg-[#F4F7FF] py-14 dark:bg-dark lg:py-20">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
              data-wow-delay=".15s"
            >
              <div className="mb-10 text-center">
                <Link href="/" className="mx-auto inline-block max-w-[160px]">
                  <Image
                    src={`${getImagePrefix()}images/logo/logo.svg`}
                    alt="logo"
                    width={140}
                    height={30}
                    className="dark:hidden"
                  />
                  <Image
                    src={`${getImagePrefix()}images/logo/logo-white.svg`}
                    alt="logo"
                    width={140}
                    height={30}
                    className="hidden dark:block"
                  />
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                  <input
                    type="password"
                    placeholder="New password"
                    name="newPassword"
                    value={data.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3"
                  />
                </div>

                <div className="mb-[22px]">
                  <input
                    type="password"
                    placeholder="Repeat new password"
                    name="ReNewPassword"
                    value={data.ReNewPassword}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-white"
                >
                  Save Password {loader && <Loader />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
