import { useEffect, useState } from "react";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const [editRol, setEditRol] = useState(false);
  const [nuevoRol, setNuevoRol] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró token. Por favor, logueate.");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/auth/perfil", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Error al obtener perfil");
          return;
        }

        setUsuario(data);
        setNuevoRol(data.rol); // inicializamos el select con el rol actual
      } catch (err) {
        console.error(err);
        setError("Error de conexión con el servidor");
      }
    };

    fetchProfile();
  }, []);

  const handleActualizarRol = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8080/api/user/${usuario._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ rol: nuevoRol }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Error al actualizar rol");
        return;
      }

      setUsuario(data);
      setEditRol(false);
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Perfil de usuario</h1>
      <p>
        <strong>Nombre:</strong> {usuario.nombre}
      </p>
      <p>
        <strong>Email:</strong> {usuario.email}
      </p>
      <p className="flex items-center gap-2">
        <strong>Rol:</strong>
        {editRol ? (
          <>
            <select
              className="border rounded px-2 py-1"
              value={nuevoRol}
              onChange={(e) => setNuevoRol(e.target.value)}
            >
              <option value="empleado">empleado</option>
              <option value="admin">admin</option>
            </select>
            <button onClick={handleActualizarRol} className="text-green-500">
              <CheckIcon className="w-5 h-5" />
            </button>
            <button onClick={() => setEditRol(false)} className="text-red-500">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <span>{usuario.rol}</span>
            <button onClick={() => setEditRol(true)} className="ml-2 text-gray-500 hover:text-gray-700">
              <PencilIcon className="w-5 h-5" />
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default Profile;
