export const signupUser = async(data: authProp) => {
  const res = await fetch("/api/auth/sign-up/email", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(!res.ok) throw new Error("Signup user failed!");

  return res.json();
};

export const loginUser = async (data: authProp) => {
  const res = await fetch("/api/auth/sign-in/email", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/josn",
    },
  });

  if (!res.ok) throw new Error("login failed ");

  return res.json();
};

export const getCurrentUser = async () => {
    const res = await fetch("/api/auth/session");

    if(!res.ok) return null;

    return res.json;
};

export const logoutUser = async () => {
    await fetch("/api/auth/sign-out", {
        method: "POST",
    });
};
