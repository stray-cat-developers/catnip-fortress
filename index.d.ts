declare module '#app' {
  interface PageMeta {
    /**
     * set true, if authentication required
     */
    private?: boolean
    /**
     * user should have one of roles, if required
     */
    roles?: string[]

    displayName: string

    icon?: string

    display?: boolean
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
