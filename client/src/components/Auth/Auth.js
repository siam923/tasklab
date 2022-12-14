import { useState, useEffect } from "react";
import { inpLogin, inpSignup } from "./authinputs";
import { useDispatch, useSelector } from "react-redux";
import { signin, signup } from "../../features/user/userAction";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { clearState } from "../../features/user/userSlice";
import toast from "react-hot-toast";

const INPCLASS = "peer my-2 p-2  rounded-lg border-2 border-gray-400";

function Auth() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const { register, reset, handleSubmit } = useForm();

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [isSignup]);

  useEffect(() => {
    if (success) {
      toast("Signup Succesfull");
      setIsSignup(false);
      navigate("/auth");
    }
    if (error) {
      toast.error("Something went wrong");
      dispatch(clearState());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, success, error]);

  const submitForm = (data) => {
    if (isSignup) {
      if (data.password !== data.confirmPassword) {
        alert("Password mismatch");
        return;
      }
      dispatch(signup(data)).unwrap();
    } else {
      dispatch(signin(data)).unwrap();
    }
  };

  const switchMode = () => {
    reset({ email: "", password: "", firstName: "", lastName: "" });
    // console.log(getValues()); // import from useform
    dispatch(clearState());
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="container max-w-xs">
      {/* lockoutline icon */}
      <h5>{isSignup ? "Sign up" : "Sign in"}</h5>
      <div>
        <form
          className="shadow-lg rounded-lg bg-white px-5 self-center"
          onSubmit={handleSubmit(submitForm)}
        >
          {isSignup ? (
            <div className="flex flex-col">
              {inpSignup.map((input) => (
                <input
                  className={INPCLASS}
                  key={input.id}
                  {...register(input.name)}
                  {...input}
                  //   value={values[input.name]}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {inpLogin.map((input) => (
                <input
                  className={INPCLASS}
                  key={input.id}
                  {...input}
                  //   value={values[input.name]}
                  {...register(input.name)}
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg text-white cursor-pointer p-2 text-lg mt-4 mb-7 bg-purple-800"
          >
            {isSignup ? "Sign up" : "Sign in"}
          </button>
        </form>
        <button
          onClick={switchMode}
          className="cursor-pointer text-blue-600 p-2 text-xs mt-4 mb-7"
        >
          {isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
