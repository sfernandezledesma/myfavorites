import React from "react";

// Este componente "agarra" los errores de los componentes hijos y muestra lo que le pedimos. 
// En development el error salta igual pero no en production.

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops. An error occurred.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;