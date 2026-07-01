/**
 * Preserva os parâmetros da URL atual ao navegar para uma nova rota
 * @param {string} path - Caminho de destino (ex: '/feed', '/direct')
 * @returns {string} - Caminho com parâmetros preservados
 */
export const preserveParams = (path) => {
  const currentParams = new URLSearchParams(window.location.search);
  const paramsString = currentParams.toString();
  const result = `${path}${paramsString ? `?${paramsString}` : ''}`;
  console.log('🔗 preserveParams:', { path, currentParams: paramsString, result });
  return result;
};

/**
 * Hook personalizado para navegação com preservação de parâmetros
 * @param {Function} navigate - Função navigate do react-router-dom
 * @returns {Function} - Função de navegação que preserva parâmetros
 */
export const useNavigateWithParams = (navigate) => {
  return (path) => {
    navigate(preserveParams(path));
  };
};
