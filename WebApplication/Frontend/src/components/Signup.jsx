import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "analyst",
    });

    const [focusedInput, setFocusedInput] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (roleValue) => {
        setFormData({ ...formData, role: roleValue });
        setIsDropdownOpen(false);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register", formData);
            if (res.data.success) {
                navigate("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                backgroundImage:
                    "url('https://static.vecteezy.com/system/resources/thumbnails/014/468/621/small/abstract-digital-technology-background-with-concept-security-vector.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                position: "relative",
            }}
        >
            {/* Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(135deg, rgba(0, 16, 42, 0.85), rgba(0, 52, 90, 0.7))",
                    zIndex: 0,
                }}
            />

            {/* Main Signup Box */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    position: "relative",
                    zIndex: 1,
                    padding: "50px",
                    background: "rgba(11, 23, 48, 0.75)",
                    borderRadius: "20px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    minWidth: "480px",
                }}
            >
                {/* Lock Icon */}
                <div
                    style={{
                        paddingRight: "30px",
                        borderRight: "1px solid rgba(255,255,255,0.2)",
                    }}
                >
                    <div
                        style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                            border: "1px solid rgba(255,255,255,0.2)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
                        }}
                    >
                        <span style={{ fontSize: "48px" }}>🔒</span>
                    </div>
                </div>

                {/* Form */}
                <div style={{ flex: 1 }}>
                    <h2
                        style={{
                            marginBottom: "8px",
                            color: "#ffffff",
                            fontWeight: "800",
                            fontSize: "28px",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Secure Signup
                    </h2>
                    <p
                        style={{
                            marginBottom: "25px",
                            fontSize: "14px",
                            color: "#b0c4de",
                        }}
                    >
                        Create your account to access the SOC portal.
                    </p>

                    <form onSubmit={handleSignup}>
                        {/* Username */}
                        <div style={{ marginBottom: "18px" }}>
                            <div
                                style={
                                    focusedInput === "username"
                                        ? { ...inputBox, ...activeInputBox }
                                        : inputBox
                                }
                            >
                                <span style={iconStyle}>👤</span>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder={
                                        focusedInput === "username" ||
                                            formData.username
                                            ? ""
                                            : "Enter Username"
                                    }
                                    value={formData.username}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput("username")}
                                    onBlur={() => setFocusedInput(null)}
                                    style={inputField}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: "18px" }}>
                            <div
                                style={
                                    focusedInput === "password"
                                        ? { ...inputBox, ...activeInputBox }
                                        : inputBox
                                }
                            >
                                <span style={iconStyle}>🔑</span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder={
                                        focusedInput === "password" ||
                                            formData.password
                                            ? ""
                                            : "Enter Password"
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput("password")}
                                    onBlur={() => setFocusedInput(null)}
                                    style={inputField}
                                />
                            </div>
                        </div>

                        {/* Role Dropdown */}
                        <div style={{ marginBottom: "25px", position: "relative" }}>
                            <div
                                style={{
                                    ...inputBox,
                                    cursor: "pointer",
                                    justifyContent: "space-between",
                                }}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <span style={iconStyle}>🛡️</span>
                                    <span
                                        style={{
                                            color: "#fff",
                                            fontSize: "16px",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {formData.role}
                                    </span>
                                </div>
                                <span style={{ color: "#bbb" }}>
                                    {isDropdownOpen ? "▲" : "▼"}
                                </span>
                            </div>

                            {isDropdownOpen && (
                                <div style={dropdownMenu}>
                                    <div
                                        style={dropdownOption}
                                        onClick={() => handleRoleSelect("analyst")}
                                    >
                                        Analyst
                                    </div>
                                    <div
                                        style={dropdownOption}
                                        onClick={() => handleRoleSelect("admin")}
                                    >
                                        Admin
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p style={errorStyle}>{error}</p>
                        )}

                        {/* Submit Button */}
                        <button type="submit" style={loginBtn}>
                            CREATE ACCOUNT
                        </button>
                    </form>

                    <p style={bottomText}>
                        Already registered?{" "}
                        <Link to="/login" style={loginLink}>
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

/* ----------------- STYLES ----------------- */

const inputBox = {
    display: "flex",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.35)",
    borderRadius: "12px",
    padding: "14px 16px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    transition: "0.25s",
};

const activeInputBox = {
    border: "1px solid rgba(79, 195, 247, 0.9)",
    boxShadow: "0 0 10px rgba(79, 195, 247, 0.6)",
};

const iconStyle = {
    fontSize: "20px",
    filter: "grayscale(100%) brightness(200%)",
    marginRight: "15px",
};

const inputField = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "16px",
    color: "#fff",
};

const dropdownMenu = {
    position: "absolute",
    top: "110%",
    left: 0,
    width: "100%",
    background: "#1a2639",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    zIndex: 10,
};

const dropdownOption = {
    padding: "12px 16px",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
};

const errorStyle = {
    color: "#ff8a80",
    background: "rgba(255,0,0,0.18)",
    padding: "8px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "10px",
};

const loginBtn = {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #2196f3, #1565c0)",
    border: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    borderRadius: "12px",
    cursor: "pointer",
};

const bottomText = {
    marginTop: "20px",
    fontSize: "14px",
    color: "#d1e3ff",
    textAlign: "center",
};

const loginLink = {
    color: "#4fc3f7",
    fontWeight: "700",
    textDecoration: "none",
};

export default Signup;
