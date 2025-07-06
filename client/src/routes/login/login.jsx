import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginForm">
          <div className="brandSection">
            <div className="logo">
              <div className="logoIcon">🏠</div>
              <h2>RaquelPerez</h2>
            </div>
            <p className="tagline">Encontre a sua casa de sonho</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="formHeader">
              <h1>Bem-vindo de volta</h1>
              <p>Entre na sua conta para continuar</p>
            </div>

            <div className="inputGroup">
              <div className="inputWrapper">
                <label htmlFor="username">Nome de utilizador</label>
                <input
                  id="username"
                  name="username"
                  required
                  minLength={3}
                  maxLength={20}
                  type="text"
                  placeholder="Digite o seu nome de utilizador"
                />
              </div>

              <div className="inputWrapper">
                <label htmlFor="password">Palavra-passe</label>
                <div className="passwordInput">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Digite a sua palavra-passe"
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="errorMessage">
                <span className="errorIcon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button disabled={isLoading} className="submitButton">
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  A entrar...
                </>
              ) : (
                "Entrar"
              )}
            </button>

            <div className="formFooter">
              <p>
                Não tem uma conta?{" "}
                <Link to="/register" className="authLink">
                  Criar conta
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="loginVisual">
          <div className="visualContent">
            <h3>Descubra as melhores propriedades</h3>
            <p>
              Mais de 2000 propriedades vendidas e 16 anos de experiência no
              mercado imobiliário português.
            </p>
            <div className="features">
              <div className="feature">
                <span className="featureIcon">✨</span>
                <span>Serviço personalizado</span>
              </div>
              <div className="feature">
                <span className="featureIcon">🏆</span>
                <span>Consultora premiada</span>
              </div>
              <div className="feature">
                <span className="featureIcon">🤝</span>
                <span>Confiança e transparência</span>
              </div>
            </div>
          </div>
          <div className="visualImage">
            <img src="/bg.png" alt="Propriedades de luxo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;