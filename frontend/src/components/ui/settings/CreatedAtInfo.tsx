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

  // const createdDate = new Date(createdAt).toLocaleString();

  return (
    <FieldContainer>
      <InfoField header='joined' value={createdDate} />
    </FieldContainer>
  );
};

export default CreatedAtInfo;
