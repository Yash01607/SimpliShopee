import React from "react";

import { Image } from "react-bootstrap";

const CustomImage = ({ className, src, alt, style, onClick, role }) => {
  src = `http://127.0.0.1:8000/${src}`;

  return (
    <Image
      style={style}
      src={src}
      className={className}
      onClick={onClick}
      alt={alt}
      role={role}
    />
  );
};

export default CustomImage;
