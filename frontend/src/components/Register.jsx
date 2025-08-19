import { useState } from "react"

const Register = ({ onRegister }) => {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("")
  const [rol, setRol] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, contraseña, rol })
      })

      const data = await res.json()
      console.log(data)
      if (!res.ok) {
        setError(data.message || "Error en el login")
        return
      }

      localStorage.setItem("token", data.token)

      onRegister(data)
      console.log(data.rol)
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
        <h2 className="text-2xl font-bold mb-4 text-center">Registrate</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <label className="block mb-2 text-sm">Nombre y Apellido</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

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

        <label className="block mb-2 text-sm">Rol</label>
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Selecciona un rol</option>
          <option value="empleado">Empleado</option>
          <option value="admin">Admin</option>
        </select>
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

export default Register
