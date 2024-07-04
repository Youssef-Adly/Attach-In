import React, { memo } from "react";

const ErrorMessage = (props) => {
  return (
    <p className="ms-3 mt-2 px-2 pe-4 rounded-pill small text-bg-danger" style={{
      width:"fit-content"
    }}>
      {props.children}
    </p>
  );
};

export default memo(ErrorMessage);
