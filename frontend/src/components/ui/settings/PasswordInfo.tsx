import ChangeBtn from "./ChangeBtn";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";

const PasswordInfo: React.FC = () => {
  let randomPassword = "";
  for (let i = 0; i < Math.floor(Math.random() * 11) + 6; i++) {
    randomPassword += "*";
  }

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
