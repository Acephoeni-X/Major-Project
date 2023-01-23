import Link from "next/link";
import React from "react";

const GotoDashboard = (props) => {
  return (
    <div>
      <Link
        // href={`/dashboard/${props.address}/${props.balance}`}
        href={{ pathname: `/dashboard/${props.address}` }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default GotoDashboard;
