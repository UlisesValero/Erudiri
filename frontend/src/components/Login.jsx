import { useState } from "react"

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email, contraseña })
      })

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Error en el login");
        return
      }

      localStorage.setItem("token", data.token)

      onLogin(data)
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="block mb-2 text-sm">Contraseña</label>
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
