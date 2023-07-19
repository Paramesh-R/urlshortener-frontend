import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalCentered from "../../components/Modal/ModalCentered";
import { useCookies } from "react-cookie";
import AuthCard from "../../components/Cards/AuthCard";





const SignIn = () => {
    const navigate = useNavigate();
    // const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [, setCookie, removeCookie] = useCookies(['token']);

    const initialData = { email: "", password: "", remember: false, };
    const [modalShow, setModalShow] = useState(false);

    /* Login Payload */
    const [loginPayload, setLoginPayload] = useState(initialData);
    const { email, password } = loginPayload;


    // Handle Email and Password fields onChange events
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setLoginPayload({ ...loginPayload, [name]: value, });
    };

    const handleError = (err) => toast.error(err);
    const handleSuccess = (msg) => toast.success(msg);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
                { ...loginPayload },
                { withCredentials: true }
            );
            console.log(data);

            // validate token and set set cookies
            if (data.token) {
                setCookie("token", data.token)
            }

            // Validate User VERIFIED Account
            if (!data.user.verified) return signOut_RedirectToSignIn();

            const { success, message } = data;
            // setUserInfo(user)
            console.log("message", message);
            console.log("success", success);

            if (success) {
                handleSuccess()
                setTimeout(() => { navigate("/", 1000) })
            } else {
                handleError()
            }

        } catch (error) {
            console.log("\n Error - SignIn : " + error);
            console.log(error.response.data.message)
            error.response.data.message ? toast.error(error.response.data.message) : toast.error("" + error)
        }

        setLoginPayload(initialData);

    }

    const signOut_RedirectToSignIn = () => {
        removeCookie("token");
        setModalShow(true);

    }


    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="row">
                    <div className="col mx-auto">
                        <AuthCard title={"Sign In"} logo_path={"../assets/images/logo.png"}>
                            {/* Form */}
                            <form onSubmit={handleSubmit}>

                                {/* Field - User Email */}
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control" id="floatingInput" placeholder="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        required
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    <label htmlFor="floatingInput"><span className="text-muted">Email</span></label>
                                </div>
                                {/* ________________________ */}

                                {/* Field - User Password */}
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control" id="floatingPassword" placeholder="Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        required
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    <label htmlFor="floatingPassword"><span className="text-muted">Password</span></label>
                                </div>
                                {/* ________________________ */}

                                {/* Link - Reset Password */}
                                <div className="m-3 text-center">
                                    <Link to="/forgotPassword" className="text-secondary text-decoration-none "><small>Forgot password?</small></Link>
                                </div>
                                {/* ________________________ */}


                                {/* Button Sign In */}
                                <div className="d-grid">
                                    <button className="btn btn-danger btn-login text-uppercase fw-bold" type="submit">Sign in</button>
                                </div>
                                {/* ________________________ */}

                            </form>

                            {/* Link - New User Registration */}
                            <div className="m-3 text-center text-muted">
                                <small>
                                    New User? <Link to={"/signUp"} className="text-muted">Sign up</Link>
                                </small>
                            </div>
                            {/* ________________________ */}
                        </AuthCard>
                    </div>
                </div>
            </div>

            {/* VERTICALLY CENTERED MODEL */}
            <ModalCentered
                show={modalShow}
                onHide={() => { setModalShow(false); navigate("/signIn"); }}
                modalTitle="Activate your account."
                message="Please follow the instructions in the email to verify your account."
            />
            {/* ________________________ */}
        </>
    )
}

export default SignIn