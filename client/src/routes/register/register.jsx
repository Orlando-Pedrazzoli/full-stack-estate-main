import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="registerContainer">
        <div className="registerForm">
          <div className="brandSection">
            <div className="logo">
              <div className="logoIcon">🏠</div>
              <h2>RaquelPerez</h2>
            </div>
            <p className="tagline">Junte-se à nossa comunidade</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="formHeader">
              <h1>Criar Nova Conta</h1>
              <p>Preencha os seus dados para começar</p>
            </div>

            <div className="inputGroup">
              <div className="inputWrapper">
                <label htmlFor="username">Nome de utilizador</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Escolha um nome de utilizador"
                  required
                  minLength={3}
                  maxLength={20}
                />
              </div>

              <div className="inputWrapper">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite o seu email"
                  required
                />
              </div>

              <div className="inputWrapper">
                <label htmlFor="password">Palavra-passe</label>
                <div className="passwordInput">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Crie uma palavra-passe segura"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                <small className="passwordHint">
                  Mínimo 6 caracteres
                </small>
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
                  A criar conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </button>

            <div className="formFooter">
              <p>
                Já tem uma conta?{" "}
                <Link to="/login" className="authLink">
                  Entrar
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="registerVisual">
          <div className="visualContent">
            <h3>Comece a sua jornada imobiliária</h3>
            <p>
              Aceda às melhores propriedades em Portugal e conte com o apoio
              especializado da Raquel Perez.
            </p>
            <div className="benefits">
              <div className="benefit">
                <span className="benefitIcon">🔍</span>
                <div>
                  <strong>Pesquisa Avançada</strong>
                  <p>Encontre exatamente o que procura</p>
                </div>
              </div>
              <div className="benefit">
                <span className="benefitIcon">❤️</span>
                <div>
                  <strong>Lista de Favoritos</strong>
                  <p>Guarde as suas propriedades preferidas</p>
                </div>
              </div>
              <div className="benefit">
                <span className="benefitIcon">💬</span>
                <div>
                  <strong>Contacto Direto</strong>
                  <p>Fale diretamente com a consultora</p>
                </div>
              </div>
            </div>
          </div>
          <div className="visualImage">
            <img src="/bg.png" alt="Propriedades exclusivas" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;