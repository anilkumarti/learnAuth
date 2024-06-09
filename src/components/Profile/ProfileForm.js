
import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";


const ProfileForm = () => {
  const history=useHistory()
  const ctx = useContext(AuthContext);
  const newPasswordInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const newEnteredPassword = newPasswordInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDcHm9_yvloklO7ib8ue1FjUi1aO73iG_A",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          password: newEnteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res=> 
      history.replace('/')
    )
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
