export function withAuth(WrappedComponent: any) {
  return function EnhancedComponent(props: any) {
    const isAuthenticated = false; // Auth Logic

    if (!isAuthenticated) {
      return <p>Access Denied</p>;
    }

    return <WrappedComponent {...props} />;
  };
}
