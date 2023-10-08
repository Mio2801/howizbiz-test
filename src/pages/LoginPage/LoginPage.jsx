import { useState } from "react";
import { logger } from "../../utils/logger";
import { useLogRender } from "../../hook/useLogRender";
import { useDispatch, useSelector } from "react-redux";
import { authErrorMessage, authLoading, loginAction } from "../../stores/auth";
import logo from '../../img/logo.png'
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  useLogRender("Login");

  const loading = useSelector(authLoading);
  const errorMessage = useSelector(authErrorMessage);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});

  const [passwordShow, setPasswordShow] = useState(false);
    let [icons, setIcons] = useState(false);

  const clickShowPassword = () => {
    setPasswordShow(!passwordShow);
    setIcons(!icons);
}

  const onChangeForm = (e) => {
    let { name, value } = e.target;
    logger.log("onChangeForm", name, value);
    setData({ ...data, [name]: value });
  };
  const validate = (data) => {
    let errors = {};
    if (!data.username) {
      errors.exist = true;
      errors.username = "Tên đăng nhập không được để trống";
    }
    if (!data.password) {
      errors.exist = true;
      errors.password = "Trường mật khẩu không được để trống";
    }
    logger.log("set error", errors);
    setErrors(errors);
    return !errors.exist;
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    let is_validate = validate(data);
    if (is_validate) {
      dispatch(loginAction(data));
    }
  };
  return (
    <div className="login-page">
      <div style={{ background: '#da2a1c', display: 'flex', color: '#fff', padding: '0 25px', height: '88px', alignItems: 'center' }}>
                    <img src={logo} style={{ height: '70px' }} alt="logo" />
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <h4 style={{ fontSize: '22px', fontWeight: '400' }}>HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN BẢO VỆ</h4>
                    </div>
                </div>
      <form className="form" onSubmit={onsubmit}>
      <div 
      style={{ backgroundImage: `url('http://wlp.howizbiz.com/static/img/footerLogin.cf032540.svg')`, display: 'flex', justifyContent: 'center', marginTop: '40px', paddingBottom: '110px' }}>
        <Card style={{ padding: '24px 16px', borderRadius: '30px', boxShadow: '0 2px 20px rgba(218, 42, 28,0.1)', border: 'none' }}>
          <div style={{ width: '415px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img style={{ height: '108px', width: '90px' }} src={logo} alt="" />
            <h4 style={{ padding: '12px 0' }}><b>Đăng nhập</b></h4>
          </div>
        <div className="textbox"
          style={{ width: '383px', display: 'flex', alignItems: 'center', height: '50px', borderRadius: '50px', border: '1px solid #eceff5', padding: '20px' }}
        >
          <FontAwesomeIcon icon="fa-regular fa-user" style={{ color: "#adadae", paddingRight: '15px' }} />
          <input style={{ border: 'none', outline: 'none', width: '280px' }}
            name="username"
            type="text"
            onChange={onChangeForm}
            disabled={loading}
          />
        </div>
          {errors.username !== "" && (
            <div data-test="error" className="error text-danger">
              {errors.username}
            </div>
          )}
        <div className="textbox"
          style={{ marginTop: '30px', width: '383px', display: 'flex', alignItems: 'center', height: '50px', borderRadius: '50px', border: '1px solid #eceff5', padding: '20px' }}
        >
          <FontAwesomeIcon icon="fa-solid fa-lock" style={{ color: "#adadae", paddingRight: '15px' }} />
          <input style={{ border: 'none', outline: 'none', width: '290px' }}
            name="password"
            type={passwordShow ? 'text' : 'password'}
            onChange={onChangeForm}
            disabled={loading}
          />
          <FontAwesomeIcon name="showPass" onClick={clickShowPassword} icon={icons ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} 
          style={{ color: "#adadae", paddingLeft: '15px', cursor: 'pointer' }} />
        </div>
          {errors.password !== "" && (
            <div data-test="error" className="error text-danger">
              {errors.password}
            </div>
          )}
        <button
          style={{color: '#fff', justifyContent: 'center', background: '#da2a1c', marginTop: '30px', width: '383px', display: 'flex', alignItems: 'center', height: '50px', borderRadius: '50px', border: '1px solid #eceff5', padding: '20px' }}
          className="btn btn-primary"
          data-test="login-btn"
          type="submit"
          disabled={loading}
        >
          <b>Đăng nhập</b>
        </button>

        {errorMessage && (
          <div data-test="error" className="error">
            {errorMessage}
          </div>
        )}
        <div 
          style={{ justifyContent: 'center', width: '383px', display: 'flex', alignItems: 'center', height: '50px', borderRadius: '50px', border: 'none', padding: '20px 20px 0 20px' }}>
          <a href="/user" style={{ textDecoration: 'none', color: '#da2a1c' }}>Quên mật khẩu</a>
        </div>
        </Card>
        </div>
      </form>
    </div>
  );
};

export default Login;
