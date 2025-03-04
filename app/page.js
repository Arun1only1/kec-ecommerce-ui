"use client";

import BuyerList from "../components/BuyerList";
import SellerList from "../components/SellerList";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isSeller } from "../utils/check.role";
import Loader from "../components/Loader";

const Home = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [firstName, setFirstName] = useState("");

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    setUserRole(window.localStorage.getItem("userRole"));
    setFirstName(window.localStorage.getItem("firstName"));
  }, []);

  if (!isMounted) {
    return <Loader />;
  }
  return (
    <div>
      <p className="text-5xl bold underline">Welcome {firstName}</p>

      {isSeller() && (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => {
            router.push("/add-product");
          }}
        >
          add product
        </Button>
      )}

      {userRole === "buyer" ? <BuyerList /> : <SellerList />}
    </div>
  );
};

export default Home;
