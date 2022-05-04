import ChangeBtn from "./ChangeBtn";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";

interface UsernameInfoProps {
  username: string;
}

const UsernameInfo: React.FC<UsernameInfoProps> = ({ username }) => {
  return (
    <FieldContainer>
      <InfoField header='username' value={username} />
      <ChangeBtn
        onClick={() => {
          console.log("changin username");
        }}
      />
    </FieldContainer>
  );
};

export default UsernameInfo;
