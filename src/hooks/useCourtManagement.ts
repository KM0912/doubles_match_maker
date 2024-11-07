import { useState } from "react";

const useCourtManagement = () => {
  const [courts, setCourts] = useState<number>(1);

  const incrementCourts = () => {
    setCourts((prevCourts) => prevCourts + 1);
  };

  const decrementCourts = () => {
    setCourts((prevCourts) => Math.max(1, prevCourts - 1));
  };

  return { courts, incrementCourts, decrementCourts };
};

export default useCourtManagement;
