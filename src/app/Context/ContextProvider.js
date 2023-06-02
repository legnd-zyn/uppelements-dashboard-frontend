"use client";
import fetchInstanceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";
import { createContext, useContext, useEffect, useState } from "react";

// Step 1: Create a new context
const RoleValueContext = createContext();

function ContextProvider({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    fetchRole();
  });

  async function fetchRole() {
    const res = await fetchInstanceClientSide("/role");
    const role = await res.json();
    setRole(role.role);
  }

  const contextValue = { role, fetchRole };

  return (
    // Step 3: Wrap the child components with the context provider
    <RoleValueContext.Provider value={contextValue}>
      {children}
    </RoleValueContext.Provider>
  );
}
export function useRole() {
  return useContext(RoleValueContext);
}

export default ContextProvider;
