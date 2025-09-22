import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserManagement from "./userManagement";
import { userApi } from "../../utils/requestJson";

export default function UserManagementPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      if (!user?.token) return navigate("/login-user");
      try {
        const data = await userApi.getUsers(user.token);
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [user, navigate]);

  if (carregando) return <div>Carregando...</div>;

  return (
    <div className="user-management-page">
      <h1>Gerenciar Usuários</h1>
      <UserManagement users={users} setUsers={setUsers} token={user?.token} />
    </div>
  );
}
