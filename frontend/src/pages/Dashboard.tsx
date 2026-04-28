import { useEffect } from "react"

const Dashboard = () => {

  // 🔒 PROTECT ROUTE
  useEffect(() => {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      window.location.href = "/login"
    }
  }, [])

  // 🔓 LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/v1/logout", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      })

      // 🧹 Clear token
      localStorage.removeItem("accessToken")

      // 🔁 Redirect to login
      window.location.href = "/login"

    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    <div>
      <h1>Protected Dashboard</h1>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard