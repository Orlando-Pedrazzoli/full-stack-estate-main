import { useState } from 'react';
import './contact.scss';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage(
        'Mensagem enviada com sucesso! Entrarei em contacto consigo brevemente.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyType: '',
        budget: '',
      });
    }, 2000);
  };

  return (
    <div className='contactPage'>
      <div className='hero'>
        <div className='heroContent'>
          <h1>Entre em Contacto</h1>
          <p>
            Estou aqui para ajudá-la em todas as suas necessidades imobiliárias
          </p>
        </div>
      </div>

      <div className='content'>
        <div className='container'>
          <div className='contactGrid'>
            <div className='contactInfo'>
              <h2>Informações de Contacto</h2>

              <div className='infoCard'>
                <div className='icon'>📱</div>
                <div className='details'>
                  <h3>Telefone</h3>
                  <p>+351 912 345 678</p>
                  <small>Disponível das 9h às 19h</small>
                </div>
              </div>

              <div className='infoCard'>
                <div className='icon'>✉️</div>
                <div className='details'>
                  <h3>Email</h3>
                  <p>raquel.perez@email.com</p>
                  <small>Resposta em 24 horas</small>
                </div>
              </div>

              <div className='infoCard'>
                <div className='icon'>🏢</div>
                <div className='details'>
                  <h3>Escritório</h3>
                  <p>
                    Av. da Liberdade, 123
                    <br />
                    1250-096 Lisboa
                  </p>
                  <small>Segunda a Sexta: 9h-18h</small>
                </div>
              </div>

              <div className='infoCard'>
                <div className='icon'>🌐</div>
                <div className='details'>
                  <h3>Redes Sociais</h3>
                  <div className='socialLinks'>
                    <a href='#' target='_blank'>
                      Facebook
                    </a>
                    <a href='#' target='_blank'>
                      Instagram
                    </a>
                    <a href='#' target='_blank'>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className='contactForm'>
              <h2>Envie uma Mensagem</h2>

              {submitMessage && (
                <div className='successMessage'>{submitMessage}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className='formGrid'>
                  <div className='formGroup'>
                    <label htmlFor='name'>Nome Completo *</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder='O seu nome'
                    />
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='email'>Email *</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder='o.seu.email@exemplo.com'
                    />
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='phone'>Telefone</label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder='+351 9XX XXX XXX'
                    />
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='subject'>Assunto *</label>
                    <select
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value=''>Selecione o assunto</option>
                      <option value='compra'>Quero Comprar</option>
                      <option value='venda'>Quero Vender</option>
                      <option value='arrendamento'>Arrendamento</option>
                      <option value='avaliacao'>Avaliação</option>
                      <option value='investimento'>
                        Consultoria de Investimento
                      </option>
                      <option value='outro'>Outro</option>
                    </select>
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='propertyType'>Tipo de Imóvel</label>
                    <select
                      id='propertyType'
                      name='propertyType'
                      value={formData.propertyType}
                      onChange={handleChange}
                    >
                      <option value=''>Selecione o tipo</option>
                      <option value='apartamento'>Apartamento</option>
                      <option value='moradia'>Moradia</option>
                      <option value='terreno'>Terreno</option>
                      <option value='comercial'>Espaço Comercial</option>
                      <option value='escritorio'>Escritório</option>
                    </select>
                  </div>

                  <div className='formGroup'>
                    <label htmlFor='budget'>Orçamento (€)</label>
                    <select
                      id='budget'
                      name='budget'
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value=''>Selecione a faixa</option>
                      <option value='ate-150k'>Até 150.000€</option>
                      <option value='150k-300k'>150.000€ - 300.000€</option>
                      <option value='300k-500k'>300.000€ - 500.000€</option>
                      <option value='500k-750k'>500.000€ - 750.000€</option>
                      <option value='750k-1m'>750.000€ - 1.000.000€</option>
                      <option value='acima-1m'>Acima de 1.000.000€</option>
                    </select>
                  </div>
                </div>

                <div className='formGroup fullWidth'>
                  <label htmlFor='message'>Mensagem *</label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows='6'
                    placeholder='Descreva em detalhe o que procura ou pretende vender/arrendar. Inclua localização preferida, características específicas, prazos, etc.'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className='submitButton'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'A enviar...' : 'Enviar Mensagem'}
                </button>
              </form>
            </div>
          </div>

          <div className='mapSection'>
            <h2>Localização do Escritório</h2>
            <div className='mapContainer'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.906!2d-9.147267!3d38.722252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19338a2d0123a1%3A0x123456789!2sAv.%20da%20Liberdade%2C%20Lisboa!5e0!3m2!1spt!2spt!4v1234567890'
                width='100%'
                height='300'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
            <div className='directions'>
              <h3>Como Chegar</h3>
              <div className='transportOptions'>
                <div className='transport'>
                  <strong>🚇 Metro:</strong> Estação Avenidas (Linha Azul)
                </div>
                <div className='transport'>
                  <strong>🚌 Autocarro:</strong> Linhas 2, 11, 44, 91
                </div>
                <div className='transport'>
                  <strong>🚗 Carro:</strong> Parque de estacionamento próximo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
