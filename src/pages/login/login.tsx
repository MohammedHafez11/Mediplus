import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { loginUser, resetAuthState } from '../../redux/authSlice'; // Import the resetAuthState action
import Footer from '../../components/footer/footer';
import Header from '../../components/header/Header';
import { toast } from 'react-hot-toast';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (auth.status === 'succeeded') {
      toast.success('Login successful!');
    } else if (auth.status === 'failed') {
      if (auth.error === 'Invalid email or password') {
        toast.error('Invalid email or password');
      } else {
        toast.error(auth.error || 'Login failed!');
      }
    }

    // Clean up the authentication state when unmounting or navigating away from the login page
    return () => {
      dispatch(resetAuthState());
    };
  }, [auth.status, auth.error, dispatch]);

  return (
    <>
      <Header />
      <div className="breadcrumbs overlay">
        {/* Breadcrumb code */}
      </div>

      <section className="contact-us section">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-12">
                <div className="contact-us-form">
                  <h2>Sign in</h2>
                  {/* Loading indicator */}
                  {auth.status === 'loading' && <p>Loading...</p>}
                  {auth.status === 'failed' && <p>{auth.error || 'Login failed!'}</p>}
                  <form className="form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            style={{ textTransform: 'none' }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <button type="submit">Sign in</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;