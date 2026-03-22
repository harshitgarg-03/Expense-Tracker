interface authProp {
    name?: string,
    email?: string,
    password?: string
}

interface useAuthprop {
    user: authProp | null,
    setUser: (user: authProp) => void,
    logout: () => void
}