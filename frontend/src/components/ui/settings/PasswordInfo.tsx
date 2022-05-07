import ChangeBtn from "./ChangeBtn";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";

const PasswordInfo: React.FC = () => {
  const randomPassword = "**************";

  return (
    <FieldContainer>
      <InfoField header='password' value={randomPassword} />
      <ChangeBtn
        onClick={() => {
          console.log("changing password");
        }}
      />
    </FieldContainer>
  );
};

export default PasswordInfo;
