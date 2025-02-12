export const redirectUser = (role) => {
  if (role === 'admin') {
    window.location.href = '/admin';
  } else if (role === 'user') {
    window.location.href = '/dashboard';
  } else {
    console.error('Unknown user role:', role);
  }
};
