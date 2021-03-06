import Link from "next/link";
import { FormikProps, Form, Field, withFormik } from "formik";
import axios from "axios";
import useUser from "lib/useUser";
import UserRegister from "schema/UserRegister";

interface RegisterValues {
  username: string;
  password: string;
  password_confirm: string;
}

interface RegisterFormPorps {}

export default function Signup() {
  const { user, mutateUser } = useUser({
    redirectTo: "/add-wallet",
    redirectIfFound: true,
  });

  const InnerForm = (props: FormikProps<RegisterValues>) => {
    const { touched, errors, isSubmitting, status } = props;

    return (
      <Form className="flex p-5 shadow-lg rounded-lg flex-col justify-around h-[80%] w-[90%] md:w-[60%] lg:w-[35%]">
        <h2 className=" text-sky-600 lg:text-center">Welcome to AlgoWallet</h2>
        <p className="text-gray-700 lg:text-center">singup to create wallet.</p>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">username</span>
          <Field type="text" name="username" />
          <div>
            {touched.username && errors.username && (
              <div className="text-red-400">{errors.username}</div>
            )}
          </div>
        </div>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">password</span>
          <Field type="password" name="password" />
          <div>
            {touched.password && errors.password && (
              <div className="text-red-400">{errors.password}</div>
            )}
          </div>
        </div>

        <div className="lg:w-[60%] lg:mx-auto">
          <span className="required-input">password confirmation</span>
          <Field type="password" name="password_confirm" />
          <div>
            {touched.password_confirm && errors.password_confirm && (
              <div className="text-red-400">{errors.password_confirm}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn-sky text-center w-[50%] self-center hover:scale-105"
          disabled={isSubmitting}
        >
          sign up
        </button>

        {status && <p className="text-center text-red-400">{status}</p>}

        <p className="text-center">
          already have an account?{" "}
          <Link href="signin">
            <a className="text-sky-400 hover:underline">login</a>
          </Link>
        </p>
      </Form>
    );
  };

  const RegisterForm = withFormik<RegisterFormPorps, RegisterValues>({
    mapPropsToValues: () => {
      return { username: "", password: "", password_confirm: "" };
    },
    validationSchema: UserRegister,
    handleSubmit: async (
      { username, password, password_confirm },
      { setStatus }
    ) => {
      try {
        const result = await axios.post("/api/user/registration", {
          username,
          password,
          password_confirm,
        });

        mutateUser(result.data);
      } catch (error: any) {
        if (error.response) {
          setStatus(error.response.data.error);
        }
      }
    },
  })(InnerForm);

  return <RegisterForm />;
}
