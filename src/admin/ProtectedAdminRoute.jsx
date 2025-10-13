import React from "react";
import { Navigate } from "react-router-dom";

function decodeJwtPayload(token) {
	// token: header.payload.signature
	try {
		const parts = token.split('.');
		if (parts.length < 2) return null;
		const payload = parts[1];
		// base64url -> base64
		const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
		// pad base64 string
		const pad = base64.length % 4;
		const padded = base64 + (pad ? '='.repeat(4 - pad) : '');
		// atob works in browser env
		const json = decodeURIComponent(
			atob(padded)
				.split('')
				.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join('')
		);
		return JSON.parse(json);
	} catch (e) {
		return null;
	}
}

export default function ProtectedAdminRoute({ children }) {
	const token = localStorage.getItem("adminToken");
	const isAdminFlag = localStorage.getItem("isAdmin") === "true";
	const expiresAt = parseInt(localStorage.getItem("adminExpires") || "0", 10);

	// if explicit expiry exists and passed — clear markers and redirect
	if (expiresAt && expiresAt < Date.now()) {
		localStorage.removeItem("adminToken");
		localStorage.removeItem("isAdmin");
		localStorage.removeItem("adminExpires");
		return <Navigate to="/admin-login" replace />;
	}

	// Validate token if present
	if (token) {
		const decoded = decodeJwtPayload(token);
		if (decoded && decoded.exp) {
			if (decoded.exp * 1000 >= Date.now()) {
				return children;
			}
			// expired token
			localStorage.removeItem("adminToken");
			localStorage.removeItem("adminExpires");
			return <Navigate to="/admin-login" replace />;
		}
		// invalid token -> clear
		localStorage.removeItem("adminToken");
		localStorage.removeItem("adminExpires");
		return <Navigate to="/admin-login" replace />;
	}

	// Fallback: allow if isAdmin flag set and not expired
	if (isAdminFlag && expiresAt && expiresAt >= Date.now()) {
		return children;
	}

	// Default: redirect to login
	return <Navigate to="/admin-login" replace />;
}
