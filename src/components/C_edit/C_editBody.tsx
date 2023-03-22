import React from "react";
import { CommunityUpdateProps } from "@/pages/c_edit";

import C_writeBody from "@/components/C_write/C_writeBody";

const C_editBody = () => {
  return (
    <>
      <C_writeBody isEdit={true} />
    </>
  );
};

export default C_editBody;
