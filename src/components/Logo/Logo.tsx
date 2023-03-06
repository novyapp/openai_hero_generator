import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="m-2 rounded-lg bg-zinc-900 p-2">
      <Image
        src="https://res.cloudinary.com/novyapp/image/upload/v1658915813/novyapp/logo.3cff0aff_keyjfs.svg"
        width={200}
        height={100}
        alt="logo"
      />
    </div>
  );
};

export default Logo;
