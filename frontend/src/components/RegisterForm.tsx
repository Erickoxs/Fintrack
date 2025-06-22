import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        name: form.email.split('@')[0], // Puedes cambiar esto si pides el nombre
        email: form.email,
        password: form.password,
      });

      setSuccess('Registro exitoso. Redirigiendo...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-[#2C3E50] mb-6 text-center">Fintrack</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C3E50]"
          />

          {error && (
            <p className="text-sm text-center text-[#E74C3C]">{error}</p>
          )}
          {success && (
            <p className="text-sm text-center text-[#27AE60]">{success}</p>
          )}

          <p className="text-sm text-center text-[#636e72]">
            ¿Ya tienes cuenta?{' '}
            <span
              onClick={() => navigate('/')}
              className="text-[#2C3E50] font-medium cursor-pointer hover:underline"
            >
              Inicia sesión
            </span>
          </p>

          <button
            type="submit"
            className="w-full bg-[#2C3E50] text-white py-2 rounded-lg hover:bg-[#1a252f] transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
