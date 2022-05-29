import { useEffect, useState } from "react";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";

interface CreatedAtInfoProps {
  createdAt: string;
}

const CreatedAtInfo: React.FC<CreatedAtInfoProps> = ({ createdAt }) => {
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    setCreatedDate(new Date(createdAt).toLocaleString());
  }, [createdAt]);

  return (
    <FieldContainer index={2}>
      <InfoField header='joined' value={createdDate} />
    </FieldContainer>
  );
};

export default CreatedAtInfo;
